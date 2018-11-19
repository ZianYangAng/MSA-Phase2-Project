using Microsoft.EntityFrameworkCore.Migrations;

namespace MovieAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MovieItem",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(nullable: true),
                    Genre = table.Column<string>(nullable: true),
                    Rating = table.Column<double>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Director = table.Column<string>(nullable: true),
                    Url = table.Column<string>(nullable: true),
                    Width = table.Column<string>(nullable: true),
                    Height = table.Column<string>(nullable: true),
                    Uploaded = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieItem", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ReviewItem",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Review = table.Column<string>(nullable: true),
                    Uploaded = table.Column<string>(nullable: true),
                    Rating = table.Column<double>(nullable: false),
                    MovieItemId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReviewItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReviewItem_MovieItem_MovieItemId",
                        column: x => x.MovieItemId,
                        principalTable: "MovieItem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReviewItem_MovieItemId",
                table: "ReviewItem",
                column: "MovieItemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReviewItem");

            migrationBuilder.DropTable(
                name: "MovieItem");
        }
    }
}
