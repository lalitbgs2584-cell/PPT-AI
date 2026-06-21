-- CreateEnum
CREATE TYPE "PRESENTATIONSTATUS" AS ENUM ('DRAFT', 'GENERATING', 'GENERATED', 'FAILED');

-- CreateTable
CREATE TABLE "presentation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "slideCount" INTEGER NOT NULL DEFAULT 4,
    "style" TEXT,
    "layout" TEXT,
    "prompt" TEXT NOT NULL,
    "tone" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "status" "PRESENTATIONSTATUS" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "presentation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slide" (
    "id" TEXT NOT NULL,
    "presentationId" TEXT NOT NULL,
    "slideNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "imagePrompt" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slide_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "presentation_userId_idx" ON "presentation"("userId");

-- CreateIndex
CREATE INDEX "slide_presentationId_idx" ON "slide"("presentationId");

-- AddForeignKey
ALTER TABLE "presentation" ADD CONSTRAINT "presentation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slide" ADD CONSTRAINT "slide_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "presentation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
