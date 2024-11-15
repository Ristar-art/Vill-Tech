<!-- src/lib/components/RouteGuard.svelte -->
<script>
    import { auth } from '$lib/firebase/firebase';
    import { authStore } from '../../store/store';
    import { goto } from "$app/navigation";
    import { page } from '$app/stores';
    
    export let requireAuth = false;
    let authChecked = false;
    
    const publicPaths = {
        auth: ['/login', '/signup', '/forgot-password', '/reset-password'],
        brand: ['/Brand/Personal', '/Brand/Business'],
        general: ['/', '/checkout', '/thank-you']
    };
    
    function isPublicRoute(path) {
        return Object.values(publicPaths).flat().some(pattern => {
            return path.startsWith(pattern);
        });
    }
    
    $: if (authChecked && $page) {
        const currentPath = $page.url.pathname;
        
        if (!$authStore.user && !isPublicRoute(currentPath)) {
            goto("/login?redirect=" + encodeURIComponent(currentPath));
        }
        
        if ($authStore.user && publicPaths.auth.includes(currentPath)) {
            goto("/");
        }
    }
</script>

<slot />