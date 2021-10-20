/**
 * @author wesen
 * @copyright 2020 wesen <wesen-ac@web.de>
 */

const RestRouter = require(__dirname + "/RestRouter.js");
const fs = require('fs');

class MapsRouter extends RestRouter
{
    constructor()
    {
        super();

        this.maps = JSON.parse(fs.readFileSync(__dirname + "/../../data/maps.json"));
    }

    list(_request, _response)
    {
        _response.json(this.maps);
    }

    /*
    getPage(_request, _response, _pageNumber, _from, _to)
    {
        let limit = _to > this.maps.length ? this.maps.length : _to;

        let pageMaps = [];
        for (let i = _from; i < limit; i++)
        {
            pageMaps.push(this.maps[i]);
        }

        _response.json({
            data: pageMaps,
            page: _pageNumber,
            totalCount: this.maps.length
        });
    }
    */

    get(_request, _response)
    {
        let mapId = Number.parseInt(_request.params.id);

        _response.json({
            id: mapId,
            name: "gibbed-gema11",
            mapMessage: "By gibbed!",
            createdBy: "gibbed",
            addedBy: "wesen",
            addDate: "2019-07-12",
            screenshotUrl: "https://archive.org/download/testmap_gibbed-gema11/screenshot.jpg",
            totalRating: 4.32,
            numberOfRatings: 10,
            userRating: null,

            revisions: [
                { revision: 27, changesDescription: 'Fixed the clips', uploader: 'wesen', uploadDate: "2019-11-30", downloadUrl: "" },
                { revision: 26, uploader: 'wesen', uploadDate: "2019-11-30" },
                { revision: 25, uploader: 'wesen', uploadDate: "2019-11-30" },
                { revision: 24, uploader: 'wesen', uploadDate: "2019-11-30" },
                { revision: 23, uploader: 'wesen', uploadDate: "2019-11-30" },
            ]
        });
    }

    create(_request, _response)
    {
        console.log("Someone tried to post");
        _response.send("ok");
    }
}

module.exports = MapsRouter;
