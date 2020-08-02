const http = require('http');
const fs = require('fs');
const qs = require('querystring');

http
  .createServer( async (req, res) => {
    switch (req.url) {
      case '/create': {
        if(req.method === 'POST') {
          try {
            
            
            //convert the data from the FE to string
            let data = '';
            req.on('data', chunk =>{
              data += chunk.toString();
            });

            let categoryUrl = '';//it will be used to redirect to the category page
            
            req.on('end', ()=>{
              //convert the data from string to a JSON file
              const post = qs.parse(data);

              const {title, body, category} = post;
              categoryUrl += category.toString();

              //write Json data to a new file
              const path = `./notes/${category}/${title}.txt`;
              const fileData = {title, body};
              
              //write Json data to a new file
              fs.writeFile(path, JSON.stringify(fileData), err=>{
                if (err) throw err;
              });
            });
            //redirects after saving the file
            res.writeHead(302, {'Location': '/beginner'});            
            res.end();

          } catch (error) {
            console.log(error);
          };
        };
      }
        
        break;
      
      case '/junior': {
        try {
          await fs.readdir( `./notes/${req.url.toString().slice(1)}`, (error, files) => { 
            //Get file Names 
            let fileNames = '';
            files.forEach(file=>{
              fileNames += `
                <li>
                  <form action='/read' method='POST'>
                    <input type='hidden' name='fileName' value='${file}'>
                    <input type='hidden' name='category' value='junior'>
                    <p><input type='submit' class="btn btn-link" value='${file.toString().slice(0,-4)}'></p>
                  </form>
                </li>`;
            })
            const FE1 = `<html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>WeJapa Blog App</title>
                    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
                    <style>
                        body    { padding-top:50px; }
                    </style>
                </head>
                <body class="container">
                    <header>
                        <nav class="navbar navbar-default" role="navigation">
                            <div class="container-fluid">                
                                <div class="navbar-header">
                                    <a class="navbar-brand" href="/">
                                        <span class="glyphicon glyphicon glyphicon-tree-deciduous"></span>
                                        WeJapa Blog App
                                    </a>                
                                    <ul class="nav navbar-nav">
                                        <li><a href="/">Home</a></li>
                                        <li><a href="/beginner">Beginner</a></li>
                                        <li><a href="/junior">Junior</a></li>
                                    </ul>
                                </div>                
                            </div>
                        </nav>
                    </header>
            
                    <main>
                        <div class="row">
                          <div class="jumbotron">
                            <h4> List Of Lecture Notes in This Category</h4>
                            <ol>`
  
            const FE2 =`</ol>
                  </div>
                        </div>
                    </main>
            
                    <footer>
                        <p class="text-center text-muted">
                            © Copyright 2020 <a href="https://wejapainternships.slack.com/team/U015S8LV8E9">@Comurule</a>
                        </p>
                    </footer>
            
                    <script>
            
                    </script>
                </body>
            
            </html>`
            const FE = FE1+fileNames+FE2;
            res.end(FE)
          });
        } catch (error) {
          console.log(error)
        }

      }
        break;

      case '/beginner': {
        try {
          await fs.readdir( `./notes/${req.url.toString().slice(1)}`, (error, files) => { 
            //Get file Names 
            let fileNames = '';
            files.forEach(file=>{
              fileNames += `
                <li>
                  <form action='/read' method='POST'>
                    <input type='hidden' name='fileName' value='${file}'>
                    <input type='hidden' name='category' value='beginner'>
                    <p><input type='submit' class="btn btn-link" value='${file.toString().slice(0,-4)}'></p>
                  </form>
                </li>`;
            })
            const FE1 = `<html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>WeJapa Blog App</title>
                    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
                    <style>
                        body    { padding-top:50px; }
                    </style>
                </head>
                <body class="container">
                    <header>
                        <nav class="navbar navbar-default" role="navigation">
                            <div class="container-fluid">                
                                <div class="navbar-header">
                                    <a class="navbar-brand" href="/">
                                        <span class="glyphicon glyphicon glyphicon-tree-deciduous"></span>
                                        WeJapa Blog App
                                    </a>                
                                    <ul class="nav navbar-nav">
                                        <li><a href="/">Home</a></li>
                                        <li><a href="/beginner">Beginner</a></li>
                                        <li><a href="/junior">Junior</a></li>
                                    </ul>
                                </div>                
                            </div>
                        </nav>
                    </header>
            
                    <main>
                        <div class="row">
                          <div class="jumbotron">
                            <h4> List Of Lecture Notes in This Category</h4>
                            <ol>`
  
            const FE2 =`</ol>
                  </div>
                        </div>
                    </main>
            
                    <footer>
                        <p class="text-center text-muted">
                            © Copyright 2020 <a href="https://wejapainternships.slack.com/team/U015S8LV8E9">@Comurule</a>
                        </p>
                    </footer>
            
                    <script>
            
                    </script>
                </body>
            
            </html>`
            const FE = FE1+fileNames+FE2;
            res.end(FE)
          });
        } catch (error) {
          console.log(error)
        }
      }
        break;
    
      case '/read' : {
        if(req.method === 'POST') {
          try {
            //convert the data from the FE to string
            let data = '';
            req.on('data', chunk =>{
              data += chunk.toString();
            });

            req.on('end', ()=>{
              //convert the data from FE back to a JSON file
              const post = qs.parse(data);
              const {fileName, category} = post;
              reader = fs.createReadStream(`./notes/${category}/${fileName}`); 
              //convert the data from the FE to string
              let fileData = '';
              reader.on('data', chunk =>{
                fileData += chunk.toString();
                console.log(fileData)
              });
              let fileNames='';
              reader.on('end', ()=>{
                const body = JSON.parse(fileData);
                fileNames += `
                <p>
                  <b>Lecture Title:</b>${body.title}<br/>
                  <b>Lecture Note:</b>${body.body}
                </p>`;
                const FE1 = `<html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>WeJapa Blog App</title>
                    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
                    <style>
                        body    { padding-top:50px; }
                    </style>
                </head>
                <body class="container">
                    <header>
                        <nav class="navbar navbar-default" role="navigation">
                            <div class="container-fluid">                
                                <div class="navbar-header">
                                    <a class="navbar-brand" href="/">
                                        <span class="glyphicon glyphicon glyphicon-tree-deciduous"></span>
                                        WeJapa Blog App
                                    </a>                
                                    <ul class="nav navbar-nav">
                                        <li><a href="/">Home</a></li>
                                        <li><a href="/beginner">Beginner</a></li>
                                        <li><a href="/junior">Junior</a></li>
                                    </ul>
                                </div>                
                            </div>
                        </nav>
                    </header>
            
                    <main>
                        <div class="row">
                          <div class="jumbotron">
                            <h4> NodeJs ${category[0].toUpperCase()}${category.slice(1)} Category Lecture Note</h4>
                            <ol>`
  
                const FE2 =`</ol>
                      </div>
                            </div>
                        </main>
                
                        <footer>
                            <p class="text-center text-muted">
                                © Copyright 2020 <a href="https://wejapainternships.slack.com/team/U015S8LV8E9">@Comurule</a>
                            </p>
                        </footer>
                
                        <script>
                
                        </script>
                    </body>
                
                </html>`
                const FE = FE1+fileNames+FE2;
                res.end(FE)
              })
            })
          
          }catch(error) {
            console.log(error)
          }
        }
      }
        break;

      default: {
        if (req.method === 'GET') {
          try {
            fs.readFile('./home.html', (err, data) => {
              res
                .writeHead(200, {"Content-Type": "text/html"})
                .end(data);
            })
        
          } catch (error) {
            console.log(error)
          }
          
        }
      }
        break;
    };
    
  })
  .listen(8080);