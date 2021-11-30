<!-- @format -->

<p align="center"><img src="https://i.imgur.com/flcMvDC.png"></p>

## Building for Pi

Download and install Raspbian Lite. In contrast to Raspian Desktop, Raspian Lite has no desktop environment preinstalled and is generally much lighter and smaller in size.

Boot up the Raspberry Pi, login as user pi with password raspberry, then start sudo raspi-config to apply some initial customizations:

- Localisation Options: Select your preferred locale, timezone, and keyboard layout.
- Change User Password: the default password is dangerous!!
- Network Options: Configure WiFi as needed
- Boot Options: Select "Desktop / CLI" and then "Console Autologin"
- Interfacing Options: Enable SSH access if needed.

Install dependencies for a simple single-window GUI

```
sudo apt-get install --no-install-recommends xserver-xorg x11-xserver-utils xinit
```

```
startx /home/pi/horn/dist/Horn.AppImage -- -nocursor
```

### Install Dependencies

```
$ cd my-app

# using yarn or npm
$ yarn (or `npm install`)

# using pnpm
$ pnpm install --shamefully-hoist
```

### Use it

```
# development mode
$ yarn dev (or `npm run dev` or `pnpm run dev`)

# production build
$ yarn build (or `npm run build` or `pnpm run build`)
```
