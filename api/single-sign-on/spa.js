import React, { PureComponent } from "react";
/**
 * An Example of a Single-Page App Conversation Implementation.
 *
 * SPA needs a "special care" while implementing the conversation
 * to clear global variables and event listeners mounted in the DOM
 *
 *
 * This Component is an App with pagination that renders new conversation with each click.
 */
export default class SinglePageApplication extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // To generate unique post id
      curPage: 1
    };
  }

  componentDidMount() {
    // Each new page is mounted to append conversation
    this.conversationDiv = window.document.getElementById("conversationDiv");
    this.appendLauncher();
  }

  appendLauncher() {
    const { curPage } = this.state;
    const script = document.createElement("script");

    script.src = `https://launcher.spot.im/spot/${SPOT_ID}`;

    // A must have attribute for SPA implementations
    script.setAttribute("data-spotim-multi-instance", "true");
    //
    script.setAttribute("data-spotim-module", "spotim-launcher");
    script.setAttribute("data-post-id", `${POST_PREFIX}${curPage}`);
    document.body.appendChild(script);

    // Init the conversation manually
    this.watchForSpotimObject();
  }

  watchForSpotimObject() {
    const tmr = setInterval(() => {
      if (typeof window.SPOTIM === "object") {
        // Init the conversation instance
        window.SPOTIM.initConversation(this.conversationDiv);
        clearInterval(tmr);
      }
    }, 10);
  }

  nextPage = () => {
    const { curPage } = this.state;

    // Terminates the conversation instance so a new one will load
    window.SPOTIM.terminateConversation(this.conversationDiv);

    this.setState({ curPage: curPage + 1 });
  };

  render() {
    const { curPage } = this.state;

    return (
      <React.Fragment>
        <div>
          <span>{`Page ${curPage} `}</span>
          <button onClick={this.nextPage}>Next Page</button>
        </div>
        <div
          id="conversationDiv"
          data-post-id={`${POST_PREFIX}${curPage}`}
          data-spot-id={SPOT_ID}
        />
      </React.Fragment>
    );
  }
}
