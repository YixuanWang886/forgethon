import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, DynamicTable, Link, LineChart } from '@forge/react';
import { invoke } from '@forge/bridge';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
  Form,
  FormHeader,
  FormSection,
  FormFooter,
  Label,
  RequiredAsterisk,
  ValidationMessage,
  Textfield,
  Button,
  useForm,
  ErrorMessage,
  HelperMessage,
  LinkButton,
  Stack,
  Box,
  Inline,
} from "@forge/react";


export const LoginForm = () => {
  const { handleSubmit, register, getFieldId } = useForm();
  const [isOpen, setIsOpen] = React.useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const submit = (data) => {
    console.log(data);
  };

  return (
    <>
    <Inline alignInline='end'>
      <Button onClick={open}>Open Modal</Button>
    </Inline>
      <ModalTransition>
        {isOpen && (
          <Modal onClose={close}>
            <Form onSubmit={handleSubmit(submit)}>
              <ModalHeader>
                <ModalTitle>Sign up</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Stack space="space.100">
                  <Box>
                    <Label labelFor={getFieldId("name")}>Name</Label>
                    <Textfield {...register("name")} />
                  </Box>
                  <Box>
                    <Label labelFor={getFieldId("email")}>Email</Label>
                    <Textfield {...register("email")} />
                  </Box>
                </Stack>
                <Box>
                  <Label labelFor={getFieldId("firstName")}>First Name</Label>
                  <Textfield {...register("firstName")} />
                </Box>
                <Box>
                  <Label labelFor={getFieldId("lastName")}>Last Name</Label>
                  <Textfield {...register("lastName")} />
                </Box>
                <Box>
                  <Label labelFor={getFieldId("country")}>Country</Label>
                  <Textfield {...register("country")} />
                </Box>
                <Box>
                  <Label labelFor={getFieldId("state")}>State</Label>
                  <Textfield {...register("state")} />
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button onClick={close} appearance="subtle">
                  Cancel
                </Button>
                <Button appearance="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        )}
      </ModalTransition>
    </>
  );
}




export const presidents = [
  {
    id: 1,
    name: "George Washington",
    score: 613,
  },
  {
    id: 2,
    name: "John Adams",
    score: 563,
  },
  {
    id: 3,
    name: "Thomas Jefferson",
    score: 358,
  },
  {
    id: 4,
    name: "James Madison",
    score: 203,
  },
  {
    id: 5,
    name: "James Monroe",
    score: 150,
  },
];


const createKey = (input) => {
  return input?input.replace(/^(the|a|an)/, "").replace(/\s/g, "") : input;
}

// applied as rows in the form
const rows = presidents.map((president, index) => ({
  key: `row-${index}-${president.name}`,
  cells: [
    {
      key: president.id,
      content: <Link href="">{president.id}</Link>,
    },
    {
      key: createKey(president.name),
      content: <Link href="">{president.name}</Link>,
    },
    {
      key: president.score,
      content: president.score,
    },
  ],
}));

const head = {
  cells: [
    {
      key: "id",
      content: "id",
      isSortable: true,
    },
    {
      key: "Name",
      content: "Name",
      shouldTruncate: true,
      isSortable: true,
    },
    {
      key: "Score",
      content: "Score",
      shouldTruncate: true,
      isSortable: true,
    },
  ],
};

export const LeaderBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Button appearance="primary" onClick={openModal}>
        Open modal
      </Button>

      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal}>
            <ModalHeader>
              <ModalTitle>Leaderboard</ModalTitle>
            </ModalHeader>
            <ModalBody>
            <LineChart 
        data={presidents} 
        xAccessor={'id'} 
        yAccessor={'score'} 
        colorAccessor={'name'}
      />;
      <DynamicTable
        caption="List of US Presidents"
        head={head}
        rows={rows}
      />              
            </ModalBody>
            <ModalFooter>
              <Button appearance="subtle" onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </>
  );
};

const App = () => {
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  // }, []);
  return (
    <>
      <LeaderBoard />
      <LoginForm />
    </>
  );
};


ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
