using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("https://reportify-ui.netlify.app/")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
var app = builder.Build();
app.Urls.Add("http://0.0.0.0:8080");
app.UseCors();


app.MapPost("/api/generate-report", (ReportRequest req) =>
{

    var stream = CreateSimpleReport(req.ClientNameOrID, req.ReportType);
    stream.Position = 0;

    return Results.File(
        stream,
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "GeneratedReport.docx"
    );
});


static MemoryStream CreateSimpleReport(string clientName, string reportType)
{
    var stream = new MemoryStream();

    using (WordprocessingDocument wordDoc =
           WordprocessingDocument.Create(stream, WordprocessingDocumentType.Document, true))
    {
        MainDocumentPart mainPart = wordDoc.AddMainDocumentPart();
        mainPart.Document = new Document();
        Body body = mainPart.Document.AppendChild(new Body());

        Paragraph para = body.AppendChild(new Paragraph());
        Run run1 = para.AppendChild(new Run());
        run1.AppendChild(new Text($"Report: {reportType} for Client: {clientName}"));
    }

    return stream;
}
app.Run();

public record ReportRequest(string ReportType, string ClientNameOrID);

