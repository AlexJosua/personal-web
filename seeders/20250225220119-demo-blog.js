"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Blogs", [
      {
        authorId: 1,
        title: "postgres is coll",
        image: "/img/1.jpg",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorId: 1,
        title: "Javascript is Cool",
        image: "/img/3.jpg",
        content:
          " iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorId: 2,
        title: "Bootstraps as CSS Tools",
        image: "/img/2.jpg",
        content:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Blogs", null, {});
  },
};
