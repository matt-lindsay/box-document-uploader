# Box Document Uploader

Remeber to add a 'docs' and 'logs' folder at the root of your project, and a 'contentLog.csv' inside you logs folder.

Place the documents you want to upload into your Box account in the docs folder.

#### Algorithm

1. Read documents into a list.
2. Create a folder for each file, get the ID of that folder and pass to the next process.
3. Create a sub folder called ORIGINAL, get the ID of that folder and pass to the next process.
4. Upload the document into the ORIGINAL folder.

#### Environment Variables

- clientID
- clientSecret
- token (at time of writing this only lasts 1 hour)

#### Roadmap

1. Persitent authentication