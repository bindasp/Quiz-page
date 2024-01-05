import {QuizFormValues} from "../../types/QuizFormValues";
import {QuizListItem} from "./QuizListItem";
import {SimpleGrid} from "@mantine/core";
import React from "react";
import {QuizCategories} from "../../types/QuizCategories";

const data: QuizFormValues[] = [
    {
        id:'6596b80ed5ff07e166ef75d1',
    title:"Quiz piłkarski",
        description:"opis",
    questions: [{question:'', correctAnswers:[], incorrectAnswers:[]}],
        category: QuizCategories.sport
  },
  {
    id:'6597c6559fded1ccd22defcf',
    title:"Quiz z liguśki",
      description:"opis",
    questions: [{question:'', correctAnswers:[], incorrectAnswers:[]}],
      category: QuizCategories.sport
  },
  {
    title:"Quiz z koszykówki",
      description:"opis",
    questions: [{question:'', correctAnswers:[], incorrectAnswers:[]}],
      category: QuizCategories.sport
  },

]
export const QuizList = () => {

  return(
      <div style={{width: '100%'}}>
        <SimpleGrid cols={{base:1, sm:2, lg:3}}>
            {data.map((item)=> <QuizListItem key={item.id} item={item}/>)}
        </SimpleGrid>
      </div>
  );
}