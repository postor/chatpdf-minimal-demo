# chatpdf-minimal-demo

[chatpdf](https://www.chatpdf.com/) 的最小实现，和文章对话 | mvp of [chatpdf](https://www.chatpdf.com/)

此项目目的在于研究 chatpdf 实现原理 | this project aims at learn how to build app like chatpdf

![screenshot](./screenshoot.png)

## 实现原理 | process flow

- 文章切片到段落 | split articles into pieces
- 通过 OpenAI 的 embedding 接口将每个段落转换为 embedding | convert each piece into embedding with OpenAI
- 将提问的问题转换为 embedding | convert user question into embedding
- 把问题的 embedding 比较所有段落 embedding 得到近似程度并排序 | compare question embedding with all the embeddings of pieces and sort the result
- 把和提问(语义)最接近的一个或几个段落作为上下文，通过 OpenAI 的对话接口得到最终的答案 | use the nearest (meaning) piece(s) as context and ask ChatGPT for the final answer

```
                   article/pdf                                    question
    /            /                        \                           |
piece1         piece2  ...........       piece(N)                     |
   |             |                         |                          |
embedding1     embedding2     ......     embedding1                   |
   |             |                         |                          |
 --X-------------X---------.....-----------X-----------------   question_embedding  
   |             |                         |                          |
question       question                  question                     |
distance1      distance2                 distance(N)                  |
                 |                                                    |
               pick nearest piece                                     |
                  \                                                   /
                           \                          /
                               construct prompt
                                     |
                              get answer from ChatGPT
```

## 使用 | usage

```
docker compose up
```