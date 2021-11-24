# netlify-cms-widget-crypto-address

Netlify CMS plugin to support crypto addresses

Widgets are inputs for the Netlify CMS editor interface. It's a React component that receives user input and outputs a serialized value.

NetlifyCMS offers the ability to add referential links between collections. It unfortunately does not provide a key widget to safely link between items.

## Install

As an npm package:

1. Install the widget:

```
npm i netlify-cms-widget-crypto-address
```

2. Import the UUID widget in the netlifyCMS file:

```
import {CryptoAddressControl, CryptoAddressPreview} from 'netlify-cms-widget-crypto-address';
```

3. Register the widget ready for use:

```
CMS.registerWidget('crypto-address', CryptoAddressControl, CryptoAddressPreview)

```

Via `script` tag:

```html
<script src="https://unpkg.com/netlify-cms-widget-crypto-address@0.1.0/dist/main.js"></script>
<script type="text/javascript">
  CMS.registerWidget(
    "crypto-address",
    CryptoAddressControl,
    CryptoAddressPreview
  );
</script>
```

## How to use

Inside the YML collections file use the new widget.

```
collections:
  - name: "example"
    label: "Example"
    folder: "/path/to/your/folder"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Address", name: "address", widget: "crypto-address"}
```
