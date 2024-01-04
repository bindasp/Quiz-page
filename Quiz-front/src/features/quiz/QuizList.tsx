
import {QuizFormValues} from "../../types/QuizFormValues";
import {QuizListItem} from "./QuizListItem";
import {SimpleGrid} from "@mantine/core";
import React from "react";

const data: QuizFormValues[] = [
    {
    id:1,
    title:"Quiz piłkarski",
        description:"opis",
    questions: [{text:'', answers:[]}],
  },
  {
    id:2,
    title:"Quiz z liguśki",
      description:"opis",
    questions: [{text:'', answers:[]}],
  },
  {
    id:3,
    title:"Quiz z koszykówki",
      description:"opis",
    questions: [{text:'', answers:[]}],
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