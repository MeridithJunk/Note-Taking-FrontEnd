import React from "react";
import App from "./App";
import {fireEvent, render, screen, waitFor} from '@testing-library/react'

beforeEach(() => {
    const fakeNote = [{
        id: 1,
        title: 'Test Note',
        body: 'This is a test note object that will be available by default',
        created_at: 1651851788359,
        created_by: 'admin',
    }];
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(fakeNote)
    });
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Note Tests', () => {
    it("Should render loading before note is loaded", async () => {
        render(<App/>)
        expect(screen.getByText(`loading...`)).toBeInTheDocument()
    });

    it("Should render note contents once note is loaded", async () => {
        render(<App/>)

        await waitFor(() => {
            expect(screen.getByText('Test Note')).toBeInTheDocument();
        });
        let time = new Date(1651851788359).toLocaleDateString();
        expect(screen.getByText('This is a test note object that will be available by default')).toBeInTheDocument();
        expect(screen.getByText(time)).toBeInTheDocument();
        expect(screen.getByText(`admin`)).toBeInTheDocument();
    });

    it("Should Add new note when submit is passed", async () => {
        render(<App/>)
        await waitFor(() => {
            expect(screen.getByText('Test Note')).toBeInTheDocument();
        });
        fireEvent.change(screen.getByPlaceholderText(`Enter Note`), {target: {value: 'New Note'}});
        fireEvent.change(screen.getByPlaceholderText(`Enter Note Title`), {target: {value: 'New Note Title'}});
        fireEvent.click(screen.getByText(`Note`));


    });
});