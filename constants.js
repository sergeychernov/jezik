export const ARCHIVE_FILE_NAME = 'archive.json';
export const CURRENT_FILE_NAME = 'current.json';
export const NEWS_FILE_NAME = 'news.json';
export const SETTINGS_FILE_NAME = 'settings.json';
export const MEMORIZATION_FILE_NAME = 'memorization.json';

export const CURRENT_DEFAULT = [];

export const DEFAULT_SETTINGS = {
    nativeLanguage: "ru",
    foreignLanguage: "sr"
}

export const DEMO = {
    sr: {
        en:{
            topic:"biti present tense",
            dictionary:[
                ["ja sam", "I am"],
                ["ti si", "you are", {add:[,"sing."]}],
                ["on je", "he/it is", {add:[,"masculine"]}],
                ["ona je", "she/it is", {add:[,"feminine"]}],
                ["ono je", "it is", {add:[,"neuter"]}],
                ["mi smo", "we are"],
                ["vi ste", "you are", {add:[,"pl."]}],
                ["oni su", "they are", {add:[,"masculine"]}],
                ["one su", "they are", {add:[,"feminine"]}],
                ["ona su", "they are", {add:[,"neuter"]}]
            ]
        },
        ru:{
            topic:"biti настоящее время",
            dictionary:[
                ["ja sam", "Я есть"],
                ["ti si", "ты есть"],
                ["on je", "он есть"],
                ["ona je", "она есть"],
                ["ono je", "оно есть"],
                ["mi smo", "мы есть"],
                ["vi ste", "вы есть"],
                ["oni su", "они есть", {add:[,"муж."]}],
                ["one su", "они есть", {add:[,"жен."]}],
                ["ona su", "они есть", {add:[,"ср."]}]
            ]
        },
    }
}