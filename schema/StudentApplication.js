cube(`StudentApplication`, {
  sql: `SELECT * FROM mongodb.student_application`,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [
        datestatus,
        programId,
        programContentaboutcourseTitle,
        programContentparagraphmoreinformationTitle,
        programContentparagraphuniversityTitle,
        programContentprofileuniversityCountryflag,
        programContentprofileuniversityNamecity,
        programContentprofileuniversityNamecountry,
        programContentprofileuniversityNameuniversity,
        programContentprofileuniversityTitlecourse,
        programContentvideosuniversitiesUrlvideo,
        programCreatedby,
        programInformationuniversityStartdate,
        userid,
      ],
    },
  },

  dimensions: {
    applicationstatus: {
      sql: `${CUBE}.\`applicationStatus\``,
      type: `string`,
    },

    datestatus: {
      sql: `${CUBE}.\`dateStatus\``,
      type: `string`,
    },

    programId: {
      sql: `${CUBE}.\`program._id\``,
      type: `string`,
      title: `Program. Id`,
    },

    programContentaboutcourseInformationcourse: {
      sql: `${CUBE}.\`program.contentAboutCourse.informationCourse\``,
      type: `string`,
      title: `Program.contentaboutcourse.informationcourse`,
    },

    programContentaboutcourseTitle: {
      sql: `${CUBE}.\`program.contentAboutCourse.title\``,
      type: `string`,
      title: `Program.contentaboutcourse.title`,
    },

    programContentdesciptioncourse: {
      sql: `${CUBE}.\`program.contentDesciptionCourse\``,
      type: `string`,
      title: `Program.contentdesciptioncourse`,
    },

    programContentparagraphmoreinformationDescriptionparagraph: {
      sql: `${CUBE}.\`program.contentParagraphMoreInformation.descriptionParagraph\``,
      type: `string`,
      title: `Program.contentparagraphmoreinformation.descriptionparagraph`,
    },

    programContentparagraphmoreinformationTitle: {
      sql: `${CUBE}.\`program.contentParagraphMoreInformation.title\``,
      type: `string`,
      title: `Program.contentparagraphmoreinformation.title`,
    },

    programContentparagraphuniversityDescriptionparagraph: {
      sql: `${CUBE}.\`program.contentParagraphUniversity.descriptionParagraph\``,
      type: `string`,
      title: `Program.contentparagraphuniversity.descriptionparagraph`,
    },

    programContentparagraphuniversityTitle: {
      sql: `${CUBE}.\`program.contentParagraphUniversity.title\``,
      type: `string`,
      title: `Program.contentparagraphuniversity.title`,
    },

    programContentprofileuniversityCountryflag: {
      sql: `${CUBE}.\`program.contentProfileUniversity.countryFlag\``,
      type: `string`,
      title: `Program.contentprofileuniversity.countryflag`,
    },

    programContentprofileuniversityNamecity: {
      sql: `${CUBE}.\`program.contentProfileUniversity.nameCity\``,
      type: `string`,
      title: `Program.contentprofileuniversity.namecity`,
    },

    programContentprofileuniversityNamecountry: {
      sql: `${CUBE}.\`program.contentProfileUniversity.nameCountry\``,
      type: `string`,
      title: `Program.contentprofileuniversity.namecountry`,
    },

    programContentprofileuniversityNameuniversity: {
      sql: `${CUBE}.\`program.contentProfileUniversity.nameUniversity\``,
      type: `string`,
      title: `Program.contentprofileuniversity.nameuniversity`,
    },

    programContentprofileuniversityTitlecourse: {
      sql: `${CUBE}.\`program.contentProfileUniversity.titleCourse\``,
      type: `string`,
      title: `Program.contentprofileuniversity.titlecourse`,
    },

    programContentprofileuniversityUrlimagelogo: {
      sql: `${CUBE}.\`program.contentProfileUniversity.urlImageLogo\``,
      type: `string`,
      title: `Program.contentprofileuniversity.urlimagelogo`,
    },

    programContentvideosuniversitiesUrlvideo: {
      sql: `${CUBE}.\`program.contentVideosUniversities.urlVideo\``,
      type: `string`,
      title: `Program.contentvideosuniversities.urlvideo`,
    },

    programCreatedby: {
      sql: `${CUBE}.\`program.createdBy\``,
      type: `string`,
      title: `Program.createdby`,
    },

    programInformationuniversityAcademicdegree: {
      sql: `${CUBE}.\`program.informationUniversity.academicDegree\``,
      type: `string`,
      title: `Program.informationuniversity.academicdegree`,
    },

    programInformationuniversityCost: {
      sql: `${CUBE}.\`program.informationUniversity.cost\``,
      type: `string`,
      title: `Program.informationuniversity.cost`,
    },

    programInformationuniversityModality: {
      sql: `${CUBE}.\`program.informationUniversity.modality\``,
      type: `string`,
      title: `Program.informationuniversity.modality`,
    },

    programInformationuniversityStartdate: {
      sql: `${CUBE}.\`program.informationUniversity.startDate\``,
      type: `string`,
      title: `Program.informationuniversity.startdate`,
    },

    programUniversitylocation: {
      sql: `${CUBE}.\`program.universityLocation\``,
      type: `string`,
      title: `Program.universitylocation`,
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
