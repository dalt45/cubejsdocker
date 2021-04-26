cube(`Landings`, {
  sql: `SELECT * FROM applications`,
  joins: {
    Universities: {
      relationship: `belongsTo`,
      sql: `${Applications}.university_id = ${Universities}.id`,
    },
  },
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, Universities.country, Universities.city],
    },
    visits: {
      type: `sum`,
      sql: `visits`,
    },
  },
  dimensions: {
    id: {
      type: `string`,
      sql: `id`,
      primaryKey: true,
      shown: true,
    },
  },
});
