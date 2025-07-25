export const CATEGORIES = {
    HEALTH: 'Salud',
    EDUCATION: 'Educación',
    EMERGENCY: 'Emergencia',
    RAFFLE: 'Rifa',
    PROJECT: 'Proyecto',
};

export const CATEGORY_ID_TO_NAME = {
    0: CATEGORIES.HEALTH,
    1: CATEGORIES.EDUCATION,
    2: CATEGORIES.EMERGENCY,
    3: CATEGORIES.RAFFLE,
    4: CATEGORIES.PROJECT,
};

export const CATEGORY_NAME_TO_ID = {
    HEALTH: 0,
    EDUCATION: 1,
    EMERGENCY: 2,
    RAFFLE: 3,
    PROJECT: 4,
};

export const CATEGORY_MAPPER = (id: number) => {
    return CATEGORY_ID_TO_NAME[id as keyof typeof CATEGORY_ID_TO_NAME];
};

export const CATEGORY_COLOR_MAPPER = (id: number) => {
    switch (id) {
        case 0: return 'danger';
        case 1: return 'secondary';
        case 2: return 'primary';
        case 3: return 'warning';
        case 4: return 'success';
    }
};

// export type CategoryType = {
//     id: number,
//     name: string
// }

// export const CATEGORIES: CategoryType[] = [
//     {
//         id: 0,
//         name: 'Salud'
//     },
//     {
//         id: 1,
//         name: 'Educación'
//     },
//     {
//         id: 2,
//         name: 'Emergencia'
//     },
//     {
//         id: 3,
//         name: 'Rifa'
//     },
//     {
//         id: 4,
//         name: 'Proyecto'
//     }
// ];
