import { fireEvent, render, screen } from "@testing-library/react";
import { describe } from "vitest";
import StickyHeader from "./StickyHeader";

describe("Component Test - StickyHeader", () => {
    test("Should show title", () => {
        render(<StickyHeader title="Title">children</StickyHeader>);
        expect(screen.getByText('Title')).toBeInTheDocument();
    })

    test("Should show children after expand", () => {
        render(<StickyHeader title="Title">children</StickyHeader>);
        fireEvent.click(screen.getByText('Title'))
        expect(screen.getByText('children')).toBeInTheDocument();
    })
})