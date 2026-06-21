import { createServerFn } from "@tanstack/react-start";
import {
  createPresentationInputSchema,
  updatePresentationInputSchema,
  presentationIdInputSchema,
  
} from "../types/presentation-types";
import { authFnMiddleware } from "#/middleware/auth.middleware";
import { prisma } from "#/lib/db";
import { generateSlug } from "random-word-slugs";
import { PRESENTATIONSTATUS } from "#/generated/prisma/enums";

export const createPresentation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => createPresentationInputSchema.parse(data))
  .middleware([authFnMiddleware])
  .handler(async ({ input, context }) => {
    const userId = context.session.user.id;

    const presentation = await prisma.presentation.create({
      data: {
        userId,
        title: generateSlug(),
        prompt: input.prompt,
        slideCount: input.slideCount,
        content: input.prompt,
        style: input.style,
        layout: input.layout,
        tone: input.tone,
        status: PRESENTATIONSTATUS.DRAFT,
      },
    });

    // TODO: trigger slide generation job, then flip status -> GENERATING -> GENERATED
    return presentation;
  });

export const updatePresentation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => updatePresentationInputSchema.parse(data))
  .middleware([authFnMiddleware])
  .handler(async ({ input, context }) => {
    const userId = context.session.user.id;
    const { id, ...rest } = input;

    const existingPresentation = await prisma.presentation.findFirst({
      where: { id, userId },
    });
    if (!existingPresentation) {
      throw new Error("Not found");
    }

    const presentation = await prisma.presentation.update({
      where: { id, userId },
      data: { ...rest },
    });

    return {
      data: presentation,
      status: 200,
    };
  });

export const deletePresentation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => presentationIdInputSchema.parse(data))
  .middleware([authFnMiddleware])
  .handler(async ({ input, context }) => {
    const userId = context.session.user.id;
    const { id } = input;

    const existingPresentation = await prisma.presentation.findFirst({
      where: { id, userId },
    });
    if (!existingPresentation) {
      throw new Error("Not found");
    }

    await prisma.presentation.delete({
      where: { id, userId },
    });

    return { success: true };
  });

export const regeneratePresentation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    createPresentationInputSchema.parse(data),
  )
  .middleware([authFnMiddleware])
  .handler(async ({ input, context }) => {
    const userId = context.session.user.id;
    const { id, ...overrides } = input;

    const existingPresentation = await prisma.presentation.findFirst({
      where: { id, userId },
    });
    if (!existingPresentation) {
      throw new Error("Not found");
    }
    if (existingPresentation.status === PRESENTATIONSTATUS.GENERATING) {
      throw new Error("Presentation is already generating");
    }

    const prompt = overrides.prompt ?? existingPresentation.prompt;

    // Wipe old slides + reset presentation in one transaction so we never
    // end up with a presentation marked GENERATING but stale slides still attached
    const presentation = await prisma.$transaction(async (tx) => {
      await tx.slide.deleteMany({ where: { presentationId: id } });

      return tx.presentation.update({
        where: { id, userId },
        data: {
          ...overrides,
          prompt,
          content: prompt,
          status: PRESENTATIONSTATUS.GENERATING,
        },
      });
    });

    // TODO: enqueue the actual AI generation job here (e.g. inngest event),
    // which should flip status -> GENERATED on success or FAILED on error
    return presentation;
  });