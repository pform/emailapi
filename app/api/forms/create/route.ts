import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid Authorization header. Please sign in with Google." },
        { status: 401 }
      );
    }

    const accessToken = authHeader.replace("Bearer ", "");

    // 1. Create Google Form
    const createResponse = await fetch("https://forms.googleapis.com/v1/forms", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        info: {
          title: "EMAIL API Guy - Troubleshooting Inquiry Form",
          documentTitle: "EMAIL API Guy - Support Form",
        },
      }),
    });

    if (!createResponse.ok) {
      const errorMsg = await createResponse.text();
      console.error("[Google Forms Create Failed]:", errorMsg);
      return NextResponse.json(
        { success: false, error: "Failed to create Google Form", details: errorMsg },
        { status: createResponse.status }
      );
    }

    const form = await createResponse.json();
    const formId = form.formId;
    const responderUri = form.responderUri;

    // 2. Add structured questions via batchUpdate
    const updateBody = {
      requests: [
        {
          createItem: {
            item: {
              title: "Your Name",
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {
                    paragraph: false,
                  },
                },
              },
            },
            location: {
              index: 0,
            },
          },
        },
        {
          createItem: {
            item: {
              title: "Your Corporate Email Address",
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {
                    paragraph: false,
                  },
                },
              },
            },
            location: {
              index: 1,
            },
          },
        },
        {
          createItem: {
            item: {
              title: "Target Domain To Check (e.g. alignmentmismatch.com)",
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {
                    paragraph: false,
                  },
                },
              },
            },
            location: {
              index: 2,
            },
          },
        },
        {
          createItem: {
            item: {
              title: "Description of Deliverability / SPF / DKIM / Mailbox Issues",
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {
                    paragraph: true,
                  },
                },
              },
            },
            location: {
              index: 3,
            },
          },
        },
      ],
    };

    const updateResponse = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBody),
    });

    if (!updateResponse.ok) {
      const updateError = await updateResponse.text();
      console.error("[Google Forms Questions Failed]:", updateError);
      return NextResponse.json(
        { success: true, formId, responderUri, warning: "Form created, but failed to inject custom questions.", details: updateError }
      );
    }

    return NextResponse.json({
      success: true,
      formId,
      responderUri,
    });
  } catch (error: any) {
    console.error("[Google Forms API Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "An unexpected error occurred during Google Form creation." },
      { status: 500 }
    );
  }
}
