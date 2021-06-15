cube(`University`, {
  sql: `SELECT * FROM backenddb.university`,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [
        contentprofileuniversityName,
        contentprofileuniversityNamecity,
        contentprofileuniversityNamecountry,
        contentprofileuniversityVideourl,
        createdby,
        imagesUrlcountryflagUrl,
      ],
    },
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `string`,
      primaryKey: true,
    },
    contentprofileuniversityDescriptionparagraph: {
      sql: `${CUBE}.\`contentProfileUniversity.descriptionParagraph\``,
      type: `string`,
      title: `Contentprofileuniversity.descriptionparagraph`,
    },

    contentprofileuniversityName: {
      sql: `${CUBE}.\`contentProfileUniversity.name\``,
      type: `string`,
      title: `Contentprofileuniversity.name`,
    },

    contentprofileuniversityNamecity: {
      sql: `${CUBE}.\`contentProfileUniversity.nameCity\``,
      type: `string`,
      title: `Contentprofileuniversity.namecity`,
    },

    contentprofileuniversityNamecountry: {
      sql: `${CUBE}.\`contentProfileUniversity.nameCountry\``,
      type: `string`,
      title: `Contentprofileuniversity.namecountry`,
    },

    contentprofileuniversityType: {
      sql: `${CUBE}.\`contentProfileUniversity.type\``,
      type: `string`,
      title: `Contentprofileuniversity.type`,
    },

    contentprofileuniversityVideourl: {
      sql: `${CUBE}.\`contentProfileUniversity.videoUrl\``,
      type: `string`,
      title: `Contentprofileuniversity.videourl`,
    },

    createdby: {
      sql: `${CUBE}.\`createdBy\``,
      type: `string`,
    },

    imagesUrlcountryflagUrl: {
      sql: `${CUBE}.\`images.urlCountryFlag.url\``,
      type: `string`,
      title: `Images.urlcountryflag.url`,
    },

    imagesUrlimagelogoUrl: {
      sql: `${CUBE}.\`images.urlImageLogo.url\``,
      type: `string`,
      title: `Images.urlimagelogo.url`,
    },

    imagesUrlmainimageUrl: {
      sql: `${CUBE}.\`images.urlMainImage.url\``,
      type: `string`,
      title: `Images.urlmainimage.url`,
    },
  },

  dataSource: `default`,
});
