const { DateTime } = require("luxon");

const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItToc = require('markdown-it-toc-done-right');

module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/css');
    eleventyConfig.addPassthroughCopy('./src/fonts');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');

    eleventyConfig.addCollection("alphabetical", function(collection) {
        return collection.getFilteredByGlob("/src/fonts/*/*.md").sort(function(a, b) {
            let nameA = a.data.title.toUpperCase();
            let nameB = b.data.title.toUpperCase();
            if (nameA < nameB) return -1;
            else if (nameA > nameB) return 1;
            else return 0;
        });
    });

    eleventyConfig.setDynamicPermalinks(false);

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
    })

    eleventyConfig.setLibrary("md",
        markdownIt({
            html: true,
            linkify: true,
            typographer: true,
        }).use(markdownItAnchor, {})
          .use(markdownItToc, {})
    );

    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
}