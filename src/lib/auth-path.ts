const PUBLIC_PREFIXES = [
    '/signup',
    '/signin',
    '/api/auth',
    '/api/inngest',
]

export function isPublicPath(pathname: string) {
    if (pathname === '/') return true
    return PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))
}

export function isLoginPath(pathname: string) {
    return pathname === '/signin'
}

export function isSignupPath(pathname: string) {
    return pathname === '/signup'
}