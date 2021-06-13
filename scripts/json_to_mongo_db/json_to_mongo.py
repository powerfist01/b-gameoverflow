import collections
import pymongo, json
from datetime import datetime
myclient = pymongo.MongoClient("mongodb://localhost:27017/")

class Main:

    def __init__(self):
        '''Default constructor'''

        self.mydb = myclient["gameoverflow"]
        self.check_existing_collections()

    def check_existing_collections(self):

        print(self.mydb.list_collection_names())

    def insert_into_db(self, collection_name, doc):
        ''''''
        try:
            mycol = self.mydb[collection_name]

            x = mycol.insert_one(doc)

            print(x.inserted_id)
        except Exception as e:
            print('Error occured in inserting!', e)

    def read_from_json_file(self, filepath):

        try:
            f = open(filepath)
            data = json.load(f)
            docs = data['results']
            return docs
        except Exception as e:
            print('Error occured!', e)

    def insert_developers_into_db(self):
        
        try:
            collection_name = 'developers'
            total_inserted = 0
            for i in range(1,1500):
                print(f'File number {i}')
                filepath = f'../../data/developers/developers_pg_{i}.json'
                docs = self.read_from_json_file(filepath)

                for doc in docs:
                    if(doc['games_count'] > 20):
                        total_inserted += 1
                        modified_doc = {
                            'name' : doc['name'],
                            'slug' : doc['slug'],
                            'developerId': total_inserted,
                            "gamesCount": doc['games_count'],
                            'createdAt': datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ')
                        }
                        print(modified_doc)
                        self.insert_into_db(collection_name, modified_doc)
                        
            return total_inserted
        except Exception as e:
            print('Error in inserting developers into db', e)

    def insert_genre_into_db(self):

        try:
            collection_name = 'genres'
            filepath = f'../../data/genres.json'
            docs = self.read_from_json_file(filepath)
            total_inserted = 0
            for doc in docs:
                total_inserted += 1
                modified_doc = {
                    'name' : doc['name'],
                    'slug' : doc['slug'],
                    'genreId': total_inserted,
                    "gamesCount": 0,
                    'createdAt': datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ')
                }
                print(modified_doc)
                self.insert_into_db(collection_name, modified_doc)
            return total_inserted
        except Exception as e:
            print('Error occured in inserting genres into db',e)

if __name__ == '__main__':
    main = Main()
    total = main.insert_genre_into_db()
    print(total)