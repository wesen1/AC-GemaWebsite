/**
 * @author wesen
 * @copyright 2020 wesen <wesen-ac@web.de>
 */

const cors = require("cors");
const express = require("express");

class RestRouter
{
    generateRouter()
    {
        let router = express.Router();

        router.get("/", cors(), this.list.bind(this));
        router.get("/:id([0-9]+)", cors(), this.get.bind(this));
        router.post("/", cors(), this.create.bind(this));
        router.put("/:id([0-9]+)", cors(), this.update.bind(this));
        router.delete("/:id([0-9]+)", cors(), this.delete.bind(this));

        return router;
    }


    list(_request, _response)
    {
    }

    get(_request, _response)
    {
    }

    create(_request, _response)
    {
    }

    update(_request, _response)
    {
    }

    delete(_request, _response)
    {
    }
}

module.exports = RestRouter;
