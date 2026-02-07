// Build search query from request parameters
export const buildSearchQuery = (params) => {
    const query = {};

    // Text search
    if (params.search) {
        query.$text = { $search: params.search };
    }

    // Category filter
    if (params.category) {
        query.categories = params.category;
    }

    // Tag filter
    if (params.tag) {
        query.tags = params.tag;
    }

    return query;
};

// Build sort options
export const buildSortOptions = (sortBy) => {
    switch (sortBy) {
        case 'oldest':
            return { createdAt: 1 };
        case 'updated':
            return { updatedAt: -1 };
        case 'title':
            return { title: 1 };
        default: // 'newest'
            return { createdAt: -1 };
    }
};

// Pagination helper
export const getPaginationData = (page, totalPosts, postsPerPage = 9) => {
    const currentPage = parseInt(page) || 1;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const skip = (currentPage - 1) * postsPerPage;

    return {
        currentPage,
        totalPages,
        skip,
        limit: postsPerPage,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
    };
};

export default { buildSearchQuery, buildSortOptions, getPaginationData };
