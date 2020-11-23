ENDPOINTS :rofl:
--------------------
- **POST /** :joy: - добавить новый проект, указав title, date, city в body, в респонсе `${date}-${crypt}-${title}`
- **GET /projects** :star_struck: - получить список всех проектов, респонс WiP
- **GET /projects/:auth** :sunglasses: - найти проект по auth, где auth это crypt или title проекта, указанные в хедере, в респонсе выдает 
            ```
            title:`Имя проекта:${project.title}`,
            crypt: `Шифр проекта:${project.crypt}`,
            date: `Дата:${project.date}`,
            city: `Город:${project.city}`
            ```
             если указан crypt, или все проекты с указанным title, если искали через него
- **DELETE /projects/:crypt** :grimacing: - удалить проект, указав его crypt в хедере. респонс - проект удален
- **PUT /projects/:crypt** :stuck_out_tongue_winking_eye: - изменить title и date проекта, указав его crypt в хедере и новые значения в body. респонс - 
           ``` 
            title:`Имя проекта:${project.title}`,
            crypt: `Шифр проекта:${project.crypt}`,
            date: `Дата:${project.date}`,
            city: `Город:${project.city}`
            ```
- **GET /city/:auth** :cowboy_hat_face: - респонс со всеми проектами в городе, указанном в auth