// Smooth-scrolls to a section by id, offsetting for the fixed header.
// Using scrollIntoView + JS here instead of relying only on CSS
// `scroll-behavior: smooth`, because that CSS property isn't reliably
// respected in all browsers (notably older Safari) and doesn't help at
// all when the click originates from an overlay like the mobile menu.
export const scrollToSection = (slug: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(slug);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Keep the URL hash in sync without triggering another jump
        history.pushState(null, '', `#${slug}`);
    }
};