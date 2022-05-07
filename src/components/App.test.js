import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import App from './App';
import * as api from "./api";

jest.mock("./api");

const mockMessage =[
  {
    "id": 1,
    "title": "Test Note",
    "body": "This is a test note object that will be available by default",
    "created_at": 1651935526683,
    "created_by": "admin",
    "edit_history": [
      {
        "edited_at": 1651935526683,
        "edited_by": "A User"
      }
    ]
  },
  {
    "id": 2,
    "title": "Another One",
    "body": "moo",
    "created_at": 1651935526683,
    "created_by": "me",
    "edit_history": [
      {
        "edited_at": 1651935526683,
        "edited_by": "A User"
      }
    ]
  }
];

beforeEach(()=>{
    api.getAllNotes = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {resolve(mockMessage)})
    });
    api.postNote = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {resolve()})
    });
    api.deleteNote = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {resolve()})
    });
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Note Tests', () => {
    it("Should render Loading before All notes has been added", async () => {
        render(<App/>)
        expect(screen.getByText(`loading...`)).toBeInTheDocument()
    });

    it("Should render All Notes", async () => {
        render(<App/>)
        await waitFor(() => {
            expect(screen.getByText(`All Notes`)).toBeInTheDocument();
        });

        expect(screen.getByText(/Test Note/)).toBeInTheDocument();
        expect(screen.getByText(/This is a test note object that will be available by default/)).toBeInTheDocument();
        expect(screen.getByText(/admin/)).toBeInTheDocument();

        expect(screen.getByText(/Another One/)).toBeInTheDocument();
        expect(screen.getByText(/moo/)).toBeInTheDocument();
        expect(screen.getByText(/me/)).toBeInTheDocument();
    });

    it("Should Add Note", async () => {
        const spy = jest.spyOn(api, 'postNote');

        render(<App/>)
        await waitFor(() => {
            expect(screen.getByText(/All Notes/)).toBeInTheDocument();
        });
        fireEvent.change(screen.getByPlaceholderText("Enter Note"), {target: {value: 'New Note'}});
        fireEvent.change(screen.getByPlaceholderText(/Enter Note Title/), {target: {value: 'New Note Title'}});
        fireEvent.click(screen.getByText(/Create Note/));

        expect(spy).toHaveBeenCalledWith("New Note Title", "New Note");
    });
    it("Should delete a Note", async () => {
        const spy = jest.spyOn(api, 'deleteNote');

        render(<App/>)
        await waitFor(() => {
            expect(screen.getByText(/All Notes/)).toBeInTheDocument();
        });
        fireEvent.click(screen.getAllByText(/Delete Note/)[0]);

        expect(spy).toHaveBeenCalledWith(1);
    });
});
