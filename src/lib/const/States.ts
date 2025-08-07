export const STATES = {
    IN_REVIEW: 'En revisión',
    PENDING_CHANGE: 'Pendiente de cambios',
    ACTIVE: 'Activa',
    CANCELLED: 'Cancelada',
    COMPLETED: 'Completada',
};

export const STATE_ID_TO_NAME = {
    0: STATES.IN_REVIEW,
    1: STATES.PENDING_CHANGE,
    2: STATES.ACTIVE,
    3: STATES.CANCELLED,
    4: STATES.COMPLETED,
};

export const STATE_NAME_TO_ID = {
    IN_REVIEW: 0,
    PENDING_CHANGE: 1,
    ACTIVE: 2,
    CANCELLED: 3,
    COMPLETED: 4,
};

export const STATE_MAPPER = (id: number) => {
    return STATE_ID_TO_NAME[id as keyof typeof STATE_ID_TO_NAME];
};

export const STATE_COLOR_MAPPER = (id: number) => {
    switch (id) {
        case 0: return 'default';
        case 1: return 'warning';
        case 2: return 'success';
        case 3: return 'danger';
        case 4: return 'secondary';
    }
};

