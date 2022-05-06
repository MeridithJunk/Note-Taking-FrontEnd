import React from "react";
import App from "./App";
import {render, screen, waitFor} from '@testing-library/react'

beforeEach(() => {
    const fakeNote = {
        title: "Notes Title"
    };
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
        const { getByText } = render(<App/>)

        await waitFor(() => {
            expect(screen.getByText(`Notes Title`)).toBeInTheDocument()
        });
    });
});