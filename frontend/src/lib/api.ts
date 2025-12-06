const API_URL = 'http://localhost:8000/api/v1';

// Helper to get token (mock for now)
const getToken = () => {
    // In a real app, this would come from localStorage or context
    // For MVP, we'll just mock it or assume the backend accepts requests without it for some endpoints
    // But we implemented JWT, so we need a token.
    // We'll implement a simple login later, but for now let's assume we have a token or we'll login automatically.
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
        throw new Error(error.detail || 'An error occurred');
    }

    return response.json();
}

export const api = {
    // Auth
    login: (data: any) => fetchAPI('/login/access-token', {
        method: 'POST',
        body: new URLSearchParams(data), // OAuth2 expects form data
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }),

    // Requests
    getRequests: () => fetchAPI('/requests/'),
    createRequest: (data: any) => fetchAPI('/requests/', { method: 'POST', body: JSON.stringify(data) }),
    updateRequest: (id: number, data: any) => fetchAPI(`/requests/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

    // Attendants
    getAttendantAssignments: (id: number) => fetchAPI(`/attendants/${id}/assignments`),

    // Inventory
    getInventory: () => fetchAPI('/inventory/'),
    createInventoryItem: (data: any) => fetchAPI('/inventory/', { method: 'POST', body: JSON.stringify(data) }),
    updateInventoryItem: (id: number, data: any) => fetchAPI(`/inventory/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

    // Payments
    getPayments: () => fetchAPI('/payments/'),
    createPayment: (data: any) => fetchAPI('/payments/', { method: 'POST', body: JSON.stringify(data) }),

    // Expenses
    getExpenses: () => fetchAPI('/expenses/'),
    createExpense: (data: any) => fetchAPI('/expenses/', { method: 'POST', body: JSON.stringify(data) }),
};
