**Version: 1.2**

# PICOL

[PICOL](http://picol.org/) is a a project to find a standard and reduced sign system for electronic communication.

For more, see:

 * http://picol.org/
 * http://blog.picol.org/

# The PICOL Generator

> I've often found myself wanting to use these cool icons, but sometimes I have found several problems in using them:

> * Icons have not the desired size
> * Badges combination have not yet been created for that icon

So I decided to create an online generator that exploit the PHP GD library or equivalent.

![Screenshot](http://apps.gotanotherway.com/picol_generator/1.1.5/PICOL%20generator_1.1.5-screenshot.png)

[Try the application](http://apps.gotanotherway.com/picol_generator/1.1.5/) for a demo.


## Local Server installation

If you want to install the application on your local server, follow indications on "INSTALL" file.

## API

You can get very quickly conversions simply call the "generator.php" file and passing these variables:

 * **size**: `number, the size of the end png`
 * **img**: `the filename with the ".svg" of the image to convert`
 * **badge**: `the filename with the ".svg" of the badge to add`
 * **action**: `"show" will show the image on screen, "" (nothing) will force download`

Example: tt>[generator.php?size=500&img=accept.svg&badge=badge_settings.svg&action=show](http://www.gotanotherway.com/apps/picol_generator/1.1.5/common/include/generator.php?size=500&img=accept.svg&badge=badge_settings.svg&action=show)</tt>

You can remotely call the generator from my server by this address: http://www.gotanotherway.com/apps/picol_generator/1.1.5/common/include/generator.php

## Dependancies

**Need ImageMagick to works!**

See http://www.imagemagick.org/script/index.php for more information


## License
    #  License
    #	
    #	This program is free software: you can redistribute it and/or modify
    #	it under the terms of the GNU General Public License as published by
    #	the Free Software Foundation, either version 3 of the License, or
    #	(at your option) any later version.
    #
    #	This program is distributed in the hope that it will be useful,
    #	but WITHOUT ANY WARRANTY; without even the implied warranty of
    #	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    #	GNU General Public License for more details.
    #
    #	You should have received a copy of the GNU General Public License
    #	along with this program.  If not, see <http://www.gnu.org/licenses/>.
    #
    #
    #	- - -
    #	Created by Alessandro Gubitosi
    #	for the PICOL Project
    #	on November 2010
    #    

This application is released under the Free GNU General Public License v3.0.
For more information about GNU License, see http://www.gnu.org/licenses/gpl.html
