
export function keys<T extends string | number | symbol>(obj: Record<T, any>): T[] {
    return Object.keys(obj) as any
}

export function capitalize(str: string){
    return str[0].toUpperCase() + str.slice(1)
}

export const AGE_RATINGS = {
    'A': 'Parcialmente adequado para crianças.',
    'M/3': 'Para crianças de 3 anos e acima',
    'M/6': 'Para crianças de 6 anos e acima',
    'M/12': 'Para pré-adolescentes de 12 anos e acima',
    'M/14': 'Para adolescentes de 14 anos e acima',
    'M/16': 'Para adolescentes de 16 anos e acima',
    'M/18': 'Para as pessoas de 18 anos e acima',
} as const

export const GENRES = [
    'ação', 'animação', 'aventura', 'comédia', 'crime', 'documentário', 'drama',
    'família', 'fantasia', 'faroeste', 'ficção científica', 'filme de tv', 'guerra',
    'história', 'mistério', 'música', 'romance', 'terror', 'thriller'
] as const