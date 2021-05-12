#!/bin/bash

# generate boilerplate component content
create_component_file() {
  touch "$component_name.component.tsx"
  {
    echo 'import React, { FC } from "react";'
    echo
    echo "interface ${component_name}Props {"
    echo "  myProperty?: string;"
    echo "  testId: string;"
    echo "}"
    echo
    echo "export const ${component_name}: FC<${component_name}Props> = ({"
    echo "  testId = \"test-component\","
    echo "  myProperty = \"World\","
    echo "}) => {"
    echo "  return <h1 data-testid={testId}>Hello {myProperty}!</h1>;"
    echo "};"
    echo
    echo "export default ${component_name};"
  }  >> "$component_name.component.tsx"
}

# Generate interfaces file
create_interfaces_file() {
  touch "$component_name.interfaces.ts"
  {
    echo 'import { EntryId } from "src/interfaces/common.interfaces";'
    echo
    echo "export interface ${component_name}Type {"
    echo "  id: EntryId;"
    echo "}"
  }  >> "$component_name.interfaces.ts"
}

# Generate interfaces file
create_normalizer_file() {
  touch "$component_name.normalizer.ts"
  {
    echo 'import { Entry } from "src/interfaces/common.interfaces";'
    echo "import { ${component_name}Type } from \"src/components/${component_name}/${component_name}.interfaces\";"
    echo
    echo "export const normalized${component_name} = (entry: Entry): ${component_name}Type => ({"
    echo "  id: entry.sys.id,"
    echo "  ...entry.fields,"
    echo "});"
  }  >> "$component_name.normalizer.ts"
}


# generate boilerplate spec content
create_spec_file() {
  touch "$component_name.spec.tsx"
  {
    echo 'import React from "react";'
    echo 'import { render, screen, waitFor } from "@testing-library/react";'
    echo "import { ${component_name} } from \"src/components/${component_name}/${component_name}.component\";"
    echo
    echo "describe(\"${component_name}\", () => {"
    echo "  it(\"renders ${component_name}\", async () => {"
    echo "    render(<${component_name} testId=\"test-component\" />);"
    echo
    echo "    const component = await screen.findByTestId(\"test-component\");"
    echo
    echo "    await waitFor(() => {"
    echo "      expect(component).toBeVisible();"
    echo "    });"
    echo "  });"
    echo "  it(\"renders myProperty\", async () => {"
    echo "    render(<${component_name} testId=\"test-component\" myProperty=\"Worlds\" />);"
    echo
    echo "    const component = await screen.findByTestId(\"test-component\");"
    echo
    echo "    await waitFor(() => {"
    echo "      expect(component.textContent).toEqual(\"Hello Worlds!\");"
    echo "    });"
    echo "  });"
    echo "});"
  } >> "$component_name.spec.tsx"
}

# Absolute path this script is in, thus /home/user/bin
script_pwd=$(dirname "$BASH_SOURCE")

component_name=$1

if [ "$component_name" = "" ]; then
  echo "Error: Component name not provided - you must provide a valid app name followed by the name of the component"
  echo "ex: scaffold_component <component_name>"
  exit 1
fi

dir="./src/components/$component_name"

if [ ! -d $dir ]; then
  mkdir "$dir"
  pushd $dir > /dev/null
  create_component_file
  create_interfaces_file
  create_normalizer_file
  create_spec_file
  popd > /dev/null
  echo "✨Successfully scaffolded ${component_name}✨"
  echo "Head over to src/components/$component_name to start building"
  echo "Happy hacking 😁"
  exit 0
else
  echo "Error: $component_name already exists. Aborting scaffolding."
  exit 1
fi