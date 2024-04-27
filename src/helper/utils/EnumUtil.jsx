export const convertGenderEnumToString = (input) => {
    switch (input) {
        case 1:
            return "Male";
        case 2:
            return "Female";
        case 3:
            return "Other";
        default:
            return "";
    }
}