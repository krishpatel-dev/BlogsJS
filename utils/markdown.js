import { marked } from 'marked';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// Configure marked options
marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false
});

// Parse markdown to HTML and sanitize
export const parseMarkdown = (markdown) => {
    if (!markdown) return '';

    const html = marked.parse(markdown);
    const clean = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'br', 'strong', 'em', 'u', 's',
            'ul', 'ol', 'li',
            'blockquote', 'code', 'pre',
            'a', 'img',
            'table', 'thead', 'tbody', 'tr', 'th', 'td'
        ],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class']
    });

    return clean;
};

// Extract plain text excerpt from markdown
export const getExcerpt = (markdown, length = 200) => {
    if (!markdown) return '';

    // Remove markdown syntax
    const plain = markdown
        .replace(/#{1,6}\s/g, '') // Remove headers
        .replace(/\*\*|__/g, '') // Remove bold
        .replace(/\*|_/g, '') // Remove italic
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links
        .replace(/`{1,3}[^`]*`{1,3}/g, '') // Remove code
        .replace(/^\s*[-*+]\s/gm, '') // Remove list markers
        .replace(/^\s*\d+\.\s/gm, '') // Remove numbered lists
        .trim();

    return plain.length > length ? plain.substring(0, length) + '...' : plain;
};

export default { parseMarkdown, getExcerpt };
