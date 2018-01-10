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

#### პირველადი სატესტო მონაცემების ჩაწერა ბაზაში (Test Data)
```
node seedtestdata.js
```

