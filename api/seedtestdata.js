var elasticsearch = require('elasticsearch')
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
})

async function createIndex(name, option) {
  await client.indices.create({
    index: name,
    body: option
  })
}

async function deleteIndex(index) {
  await client.indices.delete({
    index: index
  })
}

async function insertData(index, type, users) {
  let bulk = []
  let action = { index: { _index: index, _type: type } }

  users.forEach(item => bulk.push(action, item))

  await client.bulk({
    body: bulk
  })
}

const userIndex = {
  'settings': {
    'index': {
      'number_of_shards': 1,
      'number_of_replicas': 1
    }
  }
}
const jobIndex = {
  'settings': {
    'index': {
      'number_of_shards': 1,
      'number_of_replicas': 1
    }
  }
}
const testUsers = [{
  'firstName': 'სახელი',
  'lastName': 'გვარი',
  'personalId': '00000000000',
  'birthDate': '1991-01-11T00:00:00',
  'genderName': 'მამრობითი',
  'registrationRegionName': 'აჭარა',
  'registrationLocationName': 'ბათუმი',
  'registrationAddressDescription': 'საქართველო, ქალაქი ბათუმი, პეტრე მელიქიშვილის ქუჩა, N 91, ბინა 43',
  'factRegionName': 'თბილისი',
  'factLocationName': 'ისანი',
  'factAddressDescription': 'დიდი დიღომი 2 ნაბიჯთან',
  'mobileNumber': '591000000',
  'email': 'TTT@gmail.com',
  'contactDescription': 'დამატებითი საკონტაქტო ინფორმაცია ბლაბლა',
  'educations': [
    {
      'educationType': 'უმაღლესი განათლება',
      'educationLevel': 'ბაკალავრი',
      'institution': '       გორკის    სახ. აფხაზეთის სახელმწიფო უნივერსიტეტი',
      'locationIsInGeorgia': true,
      'locationName': 'თბილისი',
      'locationUnitName': 'ისანი',
      'additionalAddressInfo': 'სასწავლებელზე დამატებითი ინფორმაცია',
      'startMonth': 1,
      'startYear': 2011,
      'endMonth': 5,
      'endYear': 2015,
      'directionName': 'ბიზნესის ადმინისტრირება'
    }
  ],
  'formalEducationLevelName': 'უმაღლესი - ბაკალავრი',
  'formalEducationLevelId': '3',
  'languages': [
    {
      'languageName': 'აფხაზური',
      'languageLevel': 'არ ვფლობ'
    },
    {
      'languageName': 'ქართული',
      'languageLevel': 'თავისუფლად'
    }
  ],
  'skills': [
    {
      'skillName': 'Javascript',
      'endorsements': 0,
      'users': [
        'user_id1',
        'user_id2',
        'user_id3'
      ]
    },
    {
      'skillName': 'CSS',
      'endorsements': 0,
      'users': [
        'user_id1',
        'user_id2',
        'user_id3'
      ]
    }
  ],
  'jobExperiences': [
    {
      'jobTitle': 'js developer',
      'organization': 'შ.პ.ს. დელფოს გრუპი',
      'description': 'სრული და ვრცეეელი  აღწერა',
      'locationIsInGeorgia': true,
      'locationName': 'თბილისი',
      'locationUnitName': 'ისანი',
      'additionalAddressInfo': 'სამსახურზე დამატებითი ინფორმაცია',
      'startMonth': 1,
      'startYear': 2012,
      'endMonth': 2,
      'endYear': 2015,
      'hasDocument': true
    },
    {
      'jobTitle': 'მცხობელი მზარეული',
      'organization': 'შ.პ.ს. მაქს-ფუდი',
      'locationIsInGeorgia': false,
      'locationName': 'თბილისი',
      'locationUnitName': 'ისანი',
      'additionalAddressInfo': 'ხელიაქვს აუუფ',
      'startMonth': 1,
      'startYear': 2013,
      'endMonth': 2,
      'endYear': 2016,
      'hasDocument': false
    }
  ],
  'hasDrivingLicence': true,
  'drivingLicenceA': true,
  'drivingLicenceB': true,
  'drivingLicenceC': true,
  'drivingLicenceD': true,
  'drivingLicenceE': true,
  'drivingLicenceT1': true,
  'drivingLicenceT2': true,
  'airLicence': true,
  'seaLicence': true,
  'railwayLicence': true,
  'militaryObligation': false,
  'desirableJobs': [
    {
      'name': 'მთავარი მზარეულები '
    },
    {
      'name': 'ფინანსთა მენეჯერები'
    },
    {
      'name': 'საინფორმაციო ტექნოლოგიის ტრენერები'
    },
    {
      'name': 'პროგრამული უზრუნველყოფის შემუშავება-განვითარების სპეციალისტები'
    }
  ],
  'desirableJobLocations': [
    {
      'locationName': 'თბილისი',
      'locationUnitName': 'ისანი'
    },
    {
      'locationName': 'თბილისი',
      'locationUnitName': 'ვაკე'
    }
  ],
  'desirableTrainings': [
    {
      'trainigName': 'კომპიუტერული პროგრამები და ბუღალტერია',
      'locationName': 'თბილისი',
      'locationUnitName': 'ვაკე'
    },
    {
      'trainigName': ' კულინარია, მზარეული',
      'locationName': 'თბილისი',
      'locationUnitName': 'ვაკე'
    }
  ],
  'desirableSalary': 5000,
  'fullTime': true,
  'partTime': true,
  'shiftBased': true,
  'interestedInInternship': true,
  'interestedToBeVolunteer': true,
  'interestedInTemporaryJob': true,
  'interestedInDangerousJob': true,
  'interestedInTraining': true,
  'unemployed': false,
  'useMediationService': true
}]

const testJobs = [{
  'positionName': 'JavaScript Developer',
  'organization': 'შპს FX1',
  'organizationTaxCode': '123456789',
  'locationName': 'თბილისი',
  'locationUnitName': 'ისანი',
  'addressLine': 'დამატებითი მისამართი',
  'publishDate': '2017-12-03T00:00:00',
  'interviewSupposedStartDate': '2018-01-01T00:00:00',
  'endDate': '2018-01-07T00:00:00',
  'dateLastChanged': '2017-12-03T19:32:24.0343829+04:00',
  'useMediationService': true,
  'vacantPlacesQuantity': 2,
  'functionsDescription': 'blablablabla',
  'additionalDescription': 'damatebiti informacia TEST TEST',
  'averageSalaryName': '150-300',
  'fullTime': true,
  'partTime': true,
  'shiftBased': true,
  'formalEducationLevelName': 'უმაღლესი - ბაკალავრი',
  'formalEducationLevelId': '3',
  'drivingLicenceA': true,
  'drivingLicenceB': true,
  'drivingLicenceC': true,
  'drivingLicenceD': true,
  'drivingLicenceE': true,
  'drivingLicenceT1': true,
  'drivingLicenceT2': true,
  'airLicence': true,
  'seaLicence': true,
  'railwayLicence': true,
  'languages': [
    {
      'languageName': 'აფხაზური'
    },
    {
      'languageName': 'ქართული'
    }
  ],
  'skills': [
    {
      'skillName': 'Javascript'
    },
    {
      'skillName': 'CSS'
    }
  ]
}]

async function seedUserData(users, index, indexOption, type, dropIndexIfExists = false) {
  try {
    let exists = await client.indices.exists({ index: index })
    if (dropIndexIfExists === true && exists === true) {
      await deleteIndex(index)
    }
    await createIndex(index, indexOption)
    await insertData(index, type, users)
  } catch (error) {
    console.error(error)
  }
}

seedUserData(testUsers, 'user', userIndex, 'user', true)
seedUserData(testJobs, 'job', jobIndex, 'job', true)
