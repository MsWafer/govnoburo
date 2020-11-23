ENDPOINTS
--------------------
- **POST /** - добавить новый проект, указав title, date, city в body, в респонсе `${date}-${crypt}-${title}`
- **GET /projects** - получить список всех проектов, респонс WiP
- **GET /projects/:auth** - найти проект по auth, где auth это crypt или title проекта, указанные в хедере, в респонсе выдает 
            title:`Имя проекта:${project.title}`,
            crypt: `Шифр проекта:${project.crypt}`,
            date: `Дата:${project.date}`,
            city: `Город:${project.city}` если указан crypt, или все проекты с указанным title, если искали через него
- **DELETE /projects/:crypt** - удалить проект, указав его crypt в хедере. респонс - проект удален
- **PUT /projects/:crypt** - изменить title и date проекта, указав его crypt в хедере и новые значения в body. респонс - 
            title:`Имя проекта:${project.title}`,
            crypt: `Шифр проекта:${project.crypt}`,
            date: `Дата:${project.date}`,
            city: `Город:${project.city}`
- **GET /city/:auth** - респонс со всеми проектами с городом, указанным в auth