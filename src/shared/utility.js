export const baseURL = 'http://localhost:9002/msc/ais/soleerp/api/';

export const getFirstLetters = string => {
    return string
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join(' ');
}