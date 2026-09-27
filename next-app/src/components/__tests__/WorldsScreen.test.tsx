import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WorldsScreen } from "../WorldsScreen";
import { GroupKey } from "@/lib/soundData";

describe("WorldsScreen", () => {
  it("renders all three articulation-group worlds", () => {
    render(<WorldsScreen progress={{ coins: 0, stars: {} }} onPick={() => {}} />);
    expect(screen.getByText("Остров Языка-Кончика")).toBeInTheDocument();
    expect(screen.getByText("Островок Средний")).toBeInTheDocument();
    expect(screen.getByText("Горы Заднего Языка")).toBeInTheDocument();
  });

  it("shows earned stars out of the total possible for a group", () => {
    render(
      <WorldsScreen
        progress={{ coins: 5, stars: { "mid-Й": 3 } }}
        onPick={() => {}}
      />
    );
    // В группе "mid" всего один звук (Й) => максимум 3 звезды
    expect(screen.getByText("⭐ 3/3")).toBeInTheDocument();
  });

  it("calls onPick with the group key when a world card is clicked", async () => {
    const onPick = jest.fn();
    render(<WorldsScreen progress={{ coins: 0, stars: {} }} onPick={onPick} />);
    await userEvent.click(screen.getByText("Островок Средний"));
    expect(onPick).toHaveBeenCalledWith<[GroupKey]>("mid");
  });
});
