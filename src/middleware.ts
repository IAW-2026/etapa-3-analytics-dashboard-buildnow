import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // Log de debug (se puede borrar después)
  console.log('[Analytics Middleware Debug]', {
    userId,
    roleMetadata: sessionClaims?.metadata?.role,
    rolePublicMetadata: (sessionClaims as any)?.publicMetadata?.role,
    url: req.url
  });

  // No proteger rutas públicas (login)
  if (isPublicRoute(req)) {
    return;
  }

  // Todas las demás rutas requieren autenticación
  if (!userId) {
    return redirectToSignIn();
  }

  // Verificar rol: aceptar tanto 'admin' como 'superadmin'
  const role = sessionClaims?.metadata?.role as string | undefined;
  const allowedRoles = ['admin', 'superadmin'];

  if (!role || !allowedRoles.includes(role)) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

