cube(`UniversityLandings`, {
  sql: `SELECT * FROM mongodb.university_landings`,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [
        landingsId,
        landingsContentaboutcourseTitle,
        landingsContentparagraphmoreinformationTitle,
        landingsContentparagraphuniversityTitle,
        landingsContentprofileuniversityCountryflag,
        landingsContentprofileuniversityNamecity,
        landingsContentprofileuniversityNamecountry,
        landingsContentprofileuniversityNameuniversity,
        landingsContentprofileuniversityTitlecourse,
        landingsContentvideosuniversitiesUrlvideo,
        landingsCreatedby,
        landingsInformationuniversityStartdate,
      ],
    },
  },

  dimensions: {
    landingsId: {
      sql: `${CUBE}.\`landings._id\``,
      type: `string`,
      title: `Landings. Id`,
    },

    landingsContentaboutcourseInformationcourse: {
      sql: `${CUBE}.\`landings.contentAboutCourse.informationCourse\``,
      type: `string`,
      title: `Landings.contentaboutcourse.informationcourse`,
    },

    landingsContentaboutcourseTitle: {
      sql: `${CUBE}.\`landings.contentAboutCourse.title\``,
      type: `string`,
      title: `Landings.contentaboutcourse.title`,
    },

    landingsContentdesciptioncourse: {
      sql: `${CUBE}.\`landings.contentDesciptionCourse\``,
      type: `string`,
      title: `Landings.contentdesciptioncourse`,
    },

    landingsContentparagraphmoreinformationDescriptionparagraph: {
      sql: `${CUBE}.\`landings.contentParagraphMoreInformation.descriptionParagraph\``,
      type: `string`,
      title: `Landings.contentparagraphmoreinformation.descriptionparagraph`,
    },

    landingsContentparagraphmoreinformationTitle: {
      sql: `${CUBE}.\`landings.contentParagraphMoreInformation.title\``,
      type: `string`,
      title: `Landings.contentparagraphmoreinformation.title`,
    },

    landingsContentparagraphuniversityDescriptionparagraph: {
      sql: `${CUBE}.\`landings.contentParagraphUniversity.descriptionParagraph\``,
      type: `string`,
      title: `Landings.contentparagraphuniversity.descriptionparagraph`,
    },

    landingsContentparagraphuniversityTitle: {
      sql: `${CUBE}.\`landings.contentParagraphUniversity.title\``,
      type: `string`,
      title: `Landings.contentparagraphuniversity.title`,
    },

    landingsContentprofileuniversityCountryflag: {
      sql: `${CUBE}.\`landings.contentProfileUniversity.countryFlag\``,
      type: `string`,
      title: `Landings.contentprofileuniversity.countryflag`,
    },

    landingsContentprofileuniversityNamecity: {
      sql: `${CUBE}.\`landings.contentProfileUniversity.nameCity\``,
      type: `string`,
      title: `Landings.contentprofileuniversity.namecity`,
    },

    landingsContentprofileuniversityNamecountry: {
      sql: `${CUBE}.\`landings.contentProfileUniversity.nameCountry\``,
      type: `string`,
      title: `Landings.contentprofileuniversity.namecountry`,
    },

    landingsContentprofileuniversityNameuniversity: {
      sql: `${CUBE}.\`landings.contentProfileUniversity.nameUniversity\``,
      type: `string`,
      title: `Landings.contentprofileuniversity.nameuniversity`,
    },

    landingsContentprofileuniversityTitlecourse: {
      sql: `${CUBE}.\`landings.contentProfileUniversity.titleCourse\``,
      type: `string`,
      title: `Landings.contentprofileuniversity.titlecourse`,
    },

    landingsContentprofileuniversityUrlimagelogo: {
      sql: `${CUBE}.\`landings.contentProfileUniversity.urlImageLogo\``,
      type: `string`,
      title: `Landings.contentprofileuniversity.urlimagelogo`,
    },

    landingsContentvideosuniversitiesUrlvideo: {
      sql: `${CUBE}.\`landings.contentVideosUniversities.urlVideo\``,
      type: `string`,
      title: `Landings.contentvideosuniversities.urlvideo`,
    },

    landingsCreatedby: {
      sql: `${CUBE}.\`landings.createdBy\``,
      type: `string`,
      title: `Landings.createdby`,
    },

    landingsInformationuniversityAcademicdegree: {
      sql: `${CUBE}.\`landings.informationUniversity.academicDegree\``,
      type: `string`,
      title: `Landings.informationuniversity.academicdegree`,
    },

    landingsInformationuniversityCost: {
      sql: `${CUBE}.\`landings.informationUniversity.cost\``,
      type: `string`,
      title: `Landings.informationuniversity.cost`,
    },

    landingsInformationuniversityModality: {
      sql: `${CUBE}.\`landings.informationUniversity.modality\``,
      type: `string`,
      title: `Landings.informationuniversity.modality`,
    },

    landingsInformationuniversityStartdate: {
      sql: `${CUBE}.\`landings.informationUniversity.startDate\``,
      type: `string`,
      title: `Landings.informationuniversity.startdate`,
    },

    landingsUniversitylocation: {
      sql: `${CUBE}.\`landings.universityLocation\``,
      type: `string`,
      title: `Landings.universitylocation`,
    },
  },

  dataSource: `default`,
});
