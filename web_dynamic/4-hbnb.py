#!/usr/bin/python3
""" Starts a Flash Web Application """
from uuid import uuid4
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template, url_for
app = Flask(__name__, template_folder='templates')
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True


@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/4-hbnb', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    states = sorted(storage.all(State).values(), key=lambda k: k.name)
    st_ct = [[state, sorted(state.cities, key=lambda k: k.name)] for state in states]

    amenities = sorted(storage.all(Amenity).values(), key=lambda k: k.name)
    places = sorted(storage.all(Place).values(), key=lambda k: k.name)

    cache_id = str(uuid4())

    return render_template('4-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=cache_id)


if __name__ == "__main__":
    """ Main Function """
    app.run(debug=True, host='0.0.0.0', port=5000)
