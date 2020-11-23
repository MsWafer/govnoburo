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



DOCKER SHIT
--------------------------
Создать .dockerfile в основной папке кода, в нем написать:
```
FROM node:12               // выбор docker image 
WORKDIR /usr/src/app       //выбор рабочей папки в самом докере
COPY package*.json ./      //копирует джсоны для установки модулей с npm

RUN npm install            //запускает команду, устанавливающую модули указанные в джсоне
COPY . .                   //копирует содержимое содержимое папки в докер, если надо точно указать путь - поменять точки на путь откуда и куда
EXPOSE 82                  //выбор рабочего порта
CMD [ "node", "server.js" ]//выполнение команды по завершение, тут - запуск сервера
```

Можно создать файл .dockerignore, куда записать папки и/или файлы, которые будут игнорироваться при копировании в контейнер, например node_modules, .gitignore и тд.

Создать файл docker-compose.yml, в нем вписать:
```
version: '3'                                    // используемая версия докер компоуза
services:                                       //
  app:                                          //название имейджа
    container_name: projectserver               //название контейнера
    restart: always                             //всегда перезагружает после крашей, может зациклится
    build: .                                    //путь к докерфайлу
    ports:                                      //используемые порты
      - '82:82'
    depends_on:                                 //зависимость от других контейнеров
      - 'mongo'
  mongo:
    container_name: mongo_projectserver
    restart: always
    image: mongo                                //выбирает какой имейдж надо скачать с докерхаба
    ports: 
     - '27017:27017'
    volumes:                                    //указывает какие файлы/папки из контейнера будут сохранятся в докере после удаления/изменения имейджей и контейнеров
     - db-data:/data/db
     - mongo-config:/data/configdb

volumes:                                        //чет делает, хз что, но без этого не работает
  db-data: 
  mongo-config:
```


Перейти в папку с докерфайлом с помощью командной строки и написать **docker-compose up**.
Докер начнет скачивать и устанавливать указанные ранее контейнеры и имейджи, затем запустит код если все прошло гладко. Для выхода - Ctrl+C.


###### Для загрузки на сервер:
 - Скачать PuTTY/другую херню для работы с ссх.
 - Ввести ip и порт, нажать Open.
 - Ввести логин, затем пароль.
 - Войти в папку, в которую будет установлена репозитория с гита.
 - git clone <источник репозитории>.
 - Войти в папку репозитории, ввести docker-compose up -d для установки и последующего запуска.


###### Для обновления/удаления приложения:
 - Узнаем айди нужных нам контейнеров с помощью команды **docker ps**.
 - Останавливаем контейнеры с помощью команды **docker container stop айди**.
 - Удаляем контейнеры с помощью команды **docker container remove айди**.
 - Находим айди нужных имейджов с помощью команды **docker image ls**.
 - Удаляем имейджы с помощью команды **docker image remove айди**.
 - Переходим в папку над репозиторией и удаляем репозиторию с помощью **rm -r имярепозитории**.
 - Для переустановки повторить все с git clone.
