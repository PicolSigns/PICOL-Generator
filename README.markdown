![PICOL logo](http://picol.iod.io/picol_logo.png)


[PICOL](http://picol.org/) is a a project to find a standard and reduced sign system for electronic communication.

For further informations, see:

 * http://picol.org/
 * http://blog.picol.org/

# The PICOL Generator

> I've often found myself wanting to use these cool icons, but sometimes I have found several problems in using them:

> * Icons have not the desired size
> * Badges combination have not yet been created for that icon

So I decided to create an online generator that exploit the PHP GD library or equivalent.

[Try the application](http://picol.org/icon_generator.php) for a demo.


## Local Server installation

If you want to install the application on your local server, follow indications on "INSTALL" file.

## API

You can get very quickly conversions simply call the "generator.php" file and passing these variables:

| Variable |  Value type                      |  Description                                                           |
|:-------- |:-------------------------------- |:---------------------------------------------------------------------- |
| `size`   | `number`                         | The size of the end png                                                |
| `color`  | `hex`                            | The color you want to generate                                         |
| `img`    | `text`                           | The filename with the ".svg" extension of the image to convert         |
| `badge`  | `text`                           | The filename with the ".svg" extension of the badge to add             |
| `action` | <code>text (""&#124;show)</code> | "" (nothing) will force download, "show" will show the image on screen |


Example: <tt>[generator.php?size=500&color=ff0000&img=accept.svg&badge=badge_settings.svg&action=show](http://picol.iod.io/generator/1.2/common/include/generator.php?size=500&color=ff0000&img=accept.svg&badge=badge_settings.svg&action=show)</tt>

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
