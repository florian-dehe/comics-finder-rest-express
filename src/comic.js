import express from 'express';
import prisma_lib from '@prisma/client';
import dayjs from 'dayjs';

import bodyParser from 'body-parser';

const { PrismaClient } = prisma_lib;
const prisma = new PrismaClient();

const comic_router = express.Router()

comic_router.use(bodyParser.json())

//Create a comic
comic_router.post('/create', async (req, res) => {
    const { title, description, release_date, pages, isbn, cover_url, volume, writer_names, artist_names, series_name, collection_name, editor_name } = req.body;
    
    let writersConnections = [ ];
    for (const writer of writer_names) {
      let obj = {
        where:  { name: writer },
        create: { name: writer }
      }
      writersConnections.push(obj);
    }

    let artistsConnections = [ ];
    for (const artist of artist_names) {
      let obj = {
        where:  { name: artist },
        create: { name: artist }
      }
      artistsConnections.push(obj);
    }
    
    const result = await prisma.comic.create({
        data: {
          title: title,
          description: description,
          release_date: dayjs(release_date).toDate(),
          pages: pages,
          isbn: isbn,
          cover_url: cover_url,
          volume: volume,

          writers: {
            connectOrCreate: writersConnections
          },
          artists: {
            connectOrCreate: artistsConnections
          },
          series: {
            connectOrCreate: {
              where: {
                name: series_name
              },
              create: {
                name: series_name,
                collection: {
                  connectOrCreate: {
                    where: {
                      name: collection_name
                    },
                    create: {
                      name: collection_name,
                      editor: {
                        connectOrCreate: {
                          where: {
                            name: editor_name
                          },
                          create: {
                            name: editor_name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
      res.json(result);
});

comic_router.get('/all', async (req, res) => {
  const comics = await prisma.comic.findMany({
    include: {
      series: {
        include: {
          collection: {
            include: {
              editor: true
            }
          }
        }
      }
    }
  });
  res.send(comics);
});


// Read one comic by id
comic_router.get('/id',  async (req, res) => {
  const { id } = req.query;
  const comic = await prisma.comic.findUnique({
    where: {
      id: Number(id)
    }
  });
  res.send(comic);
});

// Delete one comic record by id
comic_router.delete('/id', async (req, res) => {
  const { id } = req.body;
  const deleted = await prisma.comic.delete({
    where: {
      id: id
    }
  })
  res.send(deleted);
})

export default comic_router;
