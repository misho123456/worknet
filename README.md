# worknet
მალე


### დეველოპერებს
#### branch-ის სახელი
საკითხის ნომერი (issue number)/მოკლე-დასახელება

მაგ.
```
git checkout -b 5/myprofile-skills
```
#### Docker კონტეინერი (elasticsearch)
https://www.docker.elastic.co/

```
docker run --name worknet -p 9200:9200 -itd docker.elastic.co/elasticsearch/elasticsearch:6.1.1
```
#### Docker კონტეინერი (mongo)
docker run --name worknet-mongo -p 27017:27017 -itd mongo

#### პირველადი სატესტო მონაცემების ჩაწერა ბაზაში (Test Data)
```
node seedtestdata.js
```

