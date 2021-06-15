cube(`StudentApplication`, {
  sql: `SELECT * FROM backenddb.student_application`,
  joins: {
    University: {
      relationship: `belongsTo`,
      sql: `${StudentApplication}._id = ${University}.programId`,
    },
  },
  measures: {
    count: {
      type: `count`,
      drillMembers: [
        datestatus,
        personaldataBirthdate,
        personaldataCity,
        personaldataCountry,
        personaldataLastname,
        personaldataName,
        personaldataTutorname,
        programId,
        programContentprofilecourseName,
        programCreatedby,
        userid,
      ],
    },
    personaldataStreetnumber: {
      sql: `${CUBE}.\`personalData.streetNumber\``,
      type: `sum`,
      title: `Personaldata.streetnumber`,
    },
  },
  dimensions: {
    id: {
      sql: `_id`,
      type: `string`,
      primaryKey: true,
    },
    applicationstatus: {
      sql: `${CUBE}.\`applicationStatus\``,
      type: `string`,
    },
    datestatus: {
      sql: `${CUBE}.\`dateStatus\``,
      type: `string`,
    },
    documents: {
      sql: `documents`,
      type: `string`,
    },
    documentsInstitutionAcceptanceletterUrl: {
      sql: `${CUBE}.\`documents.institution.acceptanceLetter.url\``,
      type: `string`,
      title: `Documents.institution.acceptanceletter.url`,
    },
    documentsInstitutionFinantialtestUrl: {
      sql: `${CUBE}.\`documents.institution.finantialTest.url\``,
      type: `string`,
      title: `Documents.institution.finantialtest.url`,
    },
    documentsStudentCvUrl: {
      sql: `${CUBE}.\`documents.student.cv.url\``,
      type: `string`,
      title: `Documents.student.cv.url`,
    },
    documentsStudentEnglishtestUrl: {
      sql: `${CUBE}.\`documents.student.englishTest.url\``,
      type: `string`,
      title: `Documents.student.englishtest.url`,
    },
    documentsStudentPassportUrl: {
      sql: `${CUBE}.\`documents.student.passport.url\``,
      type: `string`,
      title: `Documents.student.passport.url`,
    },
    documentsStudentRecommendationletterUrl: {
      sql: `${CUBE}.\`documents.student.recommendationLetter.url\``,
      type: `string`,
      title: `Documents.student.recommendationletter.url`,
    },
    financesPaymenttype: {
      sql: `${CUBE}.\`finances.paymentType\``,
      type: `string`,
      title: `Finances.paymenttype`,
    },
    financesStartmonth: {
      sql: `${CUBE}.\`finances.startMonth\``,
      type: `string`,
      title: `Finances.startmonth`,
    },
    financesStartyear: {
      sql: `${CUBE}.\`finances.startYear\``,
      type: `string`,
      title: `Finances.startyear`,
    },
    personaldataBadcode: {
      sql: `${CUBE}.\`personalData.badcode\``,
      type: `string`,
      title: `Personaldata.badcode`,
    },
    personaldataBirthdate: {
      sql: `${CUBE}.\`personalData.birthdate\``,
      type: `string`,
      title: `Personaldata.birthdate`,
    },
    personaldataCity: {
      sql: `${CUBE}.\`personalData.city\``,
      type: `string`,
      title: `Personaldata.city`,
    },
    personaldataCountry: {
      sql: `${CUBE}.\`personalData.country\``,
      type: `string`,
      title: `Personaldata.country`,
    },
    personaldataEmail: {
      sql: `${CUBE}.\`personalData.email\``,
      type: `string`,
      title: `Personaldata.email`,
    },
    personaldataEmergencycontactemail: {
      sql: `${CUBE}.\`personalData.emergencyContactEmail\``,
      type: `string`,
      title: `Personaldata.emergencycontactemail`,
    },
    personaldataEmergencycontactnumber: {
      sql: `${CUBE}.\`personalData.emergencyContactNumber\``,
      type: `string`,
      title: `Personaldata.emergencycontactnumber`,
    },
    personaldataGender: {
      sql: `${CUBE}.\`personalData.gender\``,
      type: `string`,
      title: `Personaldata.gender`,
    },
    personaldataLastname: {
      sql: `${CUBE}.\`personalData.lastName\``,
      type: `string`,
      title: `Personaldata.lastname`,
    },

    personaldataName: {
      sql: `${CUBE}.\`personalData.name\``,
      type: `string`,
      title: `Personaldata.name`,
    },

    personaldataNationality: {
      sql: `${CUBE}.\`personalData.nationality\``,
      type: `string`,
      title: `Personaldata.nationality`,
    },

    personaldataPhonenumber: {
      sql: `${CUBE}.\`personalData.phoneNumber\``,
      type: `string`,
      title: `Personaldata.phonenumber`,
    },

    personaldataPostalcode: {
      sql: `${CUBE}.\`personalData.postalCode\``,
      type: `string`,
      title: `Personaldata.postalcode`,
    },

    personaldataRegion: {
      sql: `${CUBE}.\`personalData.region\``,
      type: `string`,
      title: `Personaldata.region`,
    },

    personaldataStreet: {
      sql: `${CUBE}.\`personalData.street\``,
      type: `string`,
      title: `Personaldata.street`,
    },

    personaldataTutorname: {
      sql: `${CUBE}.\`personalData.tutorName\``,
      type: `string`,
      title: `Personaldata.tutorname`,
    },

    personaldataTutorrelationship: {
      sql: `${CUBE}.\`personalData.tutorRelationship\``,
      type: `string`,
      title: `Personaldata.tutorrelationship`,
    },

    programId: {
      sql: `${CUBE}.\`program._id\``,
      type: `string`,
      title: `Program. Id`,
    },

    programContentprofilecourseBriefaboutcourse: {
      sql: `${CUBE}.\`program.contentProfileCourse.briefAboutCourse\``,
      type: `string`,
      title: `Program.contentprofilecourse.briefaboutcourse`,
    },

    programContentprofilecourseCoursecontent: {
      sql: `${CUBE}.\`program.contentProfileCourse.courseContent\``,
      type: `string`,
      title: `Program.contentprofilecourse.coursecontent`,
    },

    programContentprofilecourseCoursetype: {
      sql: `${CUBE}.\`program.contentProfileCourse.courseType\``,
      type: `string`,
      title: `Program.contentprofilecourse.coursetype`,
    },

    programContentprofilecourseDuration: {
      sql: `${CUBE}.\`program.contentProfileCourse.duration\``,
      type: `string`,
      title: `Program.contentprofilecourse.duration`,
    },

    programContentprofilecourseDurationunit: {
      sql: `${CUBE}.\`program.contentProfileCourse.durationUnit\``,
      type: `string`,
      title: `Program.contentprofilecourse.durationunit`,
    },

    programContentprofilecourseEmploymentstatisticsFourmonths: {
      sql: `${CUBE}.\`program.contentProfileCourse.employmentStatistics.fourMonths\``,
      type: `string`,
      title: `Program.contentprofilecourse.employmentstatistics.fourmonths`,
    },

    programContentprofilecourseEmploymentstatisticsInternationalprojects: {
      sql: `${CUBE}.\`program.contentProfileCourse.employmentStatistics.internationalProjects\``,
      type: `string`,
      title: `Program.contentprofilecourse.employmentstatistics.internationalprojects`,
    },

    programContentprofilecourseEmploymentstatisticsPercentiles1: {
      sql: `${CUBE}.\`program.contentProfileCourse.employmentStatistics.percentiles.1\``,
      type: `string`,
      title: `Program.contentprofilecourse.employmentstatistics.percentiles.1`,
    },

    programContentprofilecourseEmploymentstatisticsPercentiles2: {
      sql: `${CUBE}.\`program.contentProfileCourse.employmentStatistics.percentiles.2\``,
      type: `string`,
      title: `Program.contentprofilecourse.employmentstatistics.percentiles.2`,
    },

    programContentprofilecourseEmploymentstatisticsPercentiles3: {
      sql: `${CUBE}.\`program.contentProfileCourse.employmentStatistics.percentiles.3\``,
      type: `string`,
      title: `Program.contentprofilecourse.employmentstatistics.percentiles.3`,
    },

    programContentprofilecourseName: {
      sql: `${CUBE}.\`program.contentProfileCourse.name\``,
      type: `string`,
      title: `Program.contentprofilecourse.name`,
    },

    programContentprofilecourseOtherrequirements: {
      sql: `${CUBE}.\`program.contentProfileCourse.otherRequirements\``,
      type: `string`,
      title: `Program.contentprofilecourse.otherrequirements`,
    },

    programContentprofilecourseParagraphcourse: {
      sql: `${CUBE}.\`program.contentProfileCourse.paragraphCourse\``,
      type: `string`,
      title: `Program.contentprofilecourse.paragraphcourse`,
    },

    programContentprofilecourseParagraphwhystudy: {
      sql: `${CUBE}.\`program.contentProfileCourse.paragraphWhyStudy\``,
      type: `string`,
      title: `Program.contentprofilecourse.paragraphwhystudy`,
    },

    programContentprofilecoursePricesAverageyearcost: {
      sql: `${CUBE}.\`program.contentProfileCourse.prices.averageYearCost\``,
      type: `string`,
      title: `Program.contentprofilecourse.prices.averageyearcost`,
    },

    programContentprofilecoursePricesBeintcost: {
      sql: `${CUBE}.\`program.contentProfileCourse.prices.beIntCost\``,
      type: `string`,
      title: `Program.contentprofilecourse.prices.beintcost`,
    },

    programContentprofilecoursePricesMonthlyaccomodation: {
      sql: `${CUBE}.\`program.contentProfileCourse.prices.monthlyAccomodation\``,
      type: `string`,
      title: `Program.contentprofilecourse.prices.monthlyaccomodation`,
    },

    programContentprofilecoursePricesTotaltuitioncost: {
      sql: `${CUBE}.\`program.contentProfileCourse.prices.totalTuitionCost\``,
      type: `string`,
      title: `Program.contentprofilecourse.prices.totaltuitioncost`,
    },

    programContentprofilecourseRequirementsGmt: {
      sql: `${CUBE}.\`program.contentProfileCourse.requirements.GMT\``,
      type: `string`,
      title: `Program.contentprofilecourse.requirements.gmt`,
    },

    programContentprofilecourseRequirementsIelts: {
      sql: `${CUBE}.\`program.contentProfileCourse.requirements.IELTS\``,
      type: `string`,
      title: `Program.contentprofilecourse.requirements.ielts`,
    },

    programContentprofilecourseRequirementsToefl: {
      sql: `${CUBE}.\`program.contentProfileCourse.requirements.TOEFL\``,
      type: `string`,
      title: `Program.contentprofilecourse.requirements.toefl`,
    },

    programCreatedby: {
      sql: `${CUBE}.\`program.createdBy\``,
      type: `string`,
      title: `Program.createdby`,
    },

    testBadcode: {
      sql: `${CUBE}.\`test.badcode\``,
      type: `string`,
      title: `Test.badcode`,
    },

    userid: {
      sql: `${CUBE}.\`userId\``,
      type: `string`,
    },

    userstatus: {
      sql: `${CUBE}.\`userStatus\``,
      type: `string`,
    },
  },

  dataSource: `default`,
});
