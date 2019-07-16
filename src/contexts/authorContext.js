import React from "react";

export const Author = {
    authorId:"",
    authorName:""
}

export const AuthorContext = React.createContext({
    authorName:Author.authorName
});