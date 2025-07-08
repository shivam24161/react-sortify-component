export type elementRect = {
  top: number;
  left: number;
  width: number;
  height: number;
  bottom: number;
  right: number;
};

export const pointInRangeArr = (
  arr: elementRect[],
  point: { x: number; y: number }
): number => {
  const { x, y } = point;
  let minDistance = Number.MAX_SAFE_INTEGER;
  let nearestIndex = -1;

  for (let i = 0; i < arr.length; i++) {
    const currRect = arr[i];

    // Check if the point is inside the rectangle
    if (
      currRect.top <= y &&
      currRect.bottom >= y &&
      currRect.left <= x &&
      currRect.right >= x
    ) {
      return i; // Return the index of the first rectangle that contains the point
    }

    // Calculate the vertical distance from the point to the rectangle
    const rowDistance = Math.abs(y - (currRect.top + currRect.height / 2));

    // Calculate the horizontal distance from the point to the rectangle
    const colDistance = Math.abs(x - (currRect.left + currRect.width / 2));

    // Calculate the Euclidean distance from the point to the rectangle
    const distance = Math.sqrt(rowDistance * rowDistance + colDistance * colDistance);

    // Update the nearest index if the current rectangle is closer
    if (distance < minDistance) {
      minDistance = distance;
      nearestIndex = i;
    }
  }

  return nearestIndex;
};

export const getClientXY = (event: MouseEvent | TouchEvent | any) => {
  let clientX = -1,
    clientY = -1;

  if (
    event.type === "mousemove" ||
    event.type === "mouseup" ||
    event.type === "mousedown"
  ) {
    event = event as MouseEvent;
    clientX = event?.clientX;
    clientY = event?.clientY;
  } else {
    event = event as TouchEvent;
    clientX = event.touches[0]?.clientX;
    clientY = event.touches[0]?.clientY;
  }

  return { clientX, clientY };
};

export const swapArray = (from: number, to: number, arr: any[]): any[] => {
  let res = [...arr];
  const delItem = arr[from];
  res.splice(from, 1);
  res.splice(to, 0, delItem);
  return [...res];
};

export const makeRangeArray = (container: HTMLElement) => {
  const containerRect = container.getBoundingClientRect();
  const res = Array.from(container.children).map((item: Element) => {
    const currRect = item.getBoundingClientRect();
    const currRange = {
      top: currRect.top + container.scrollTop - containerRect.top,
      bottom: currRect.bottom + container.scrollTop - containerRect.top,
      left: currRect.left + container.scrollLeft - containerRect.left,
      right: currRect.right + container.scrollLeft - containerRect.left,
      width: currRect.width,
      height: currRect.height,
    };
    return currRange;
  });
  return res;
};


export const handelAutoScroll = (event: MouseEvent | TouchEvent, containerRef: React.RefObject<HTMLDivElement>, timerRef: React.MutableRefObject<any | undefined>) => {
  const edgeSize = 50;
  if (!containerRef.current) return;

  const containerRect = containerRef.current.getBoundingClientRect();
  const { clientX, clientY } = getClientXY(event);

  const viewportX = clientX;
  const viewportY = clientY;
  const viewportWidth = containerRef.current.clientWidth;
  const viewportHeight = containerRef.current.clientHeight;

  const edgeTop = edgeSize + containerRect.top;
  const edgeLeft = edgeSize + containerRect.left;
  const edgeBottom = viewportHeight + containerRect.top - edgeSize;
  const edgeRight = viewportWidth + containerRect.left - edgeSize;

  const isInLeftEdge = viewportX < edgeLeft;
  const isInRightEdge = viewportX > edgeRight;
  const isInTopEdge = viewportY < edgeTop;
  const isInBottomEdge = viewportY > edgeBottom;

  if (!(isInLeftEdge || isInRightEdge || isInTopEdge || isInBottomEdge)) {
    clearTimeout(timerRef.current);
    return;
  }

  const containerWidth = Math.max(
    containerRef.current.scrollWidth,
    containerRef.current.offsetWidth,
    containerRef.current.clientWidth
  );

  const containerHeight = Math.max(
    containerRef.current.scrollHeight,
    containerRef.current.offsetHeight,
    containerRef.current.clientHeight
  );

  const maxScrollX = containerWidth - viewportWidth;
  const maxScrollY = containerHeight - viewportHeight;

  function adjustWindowScroll() {
    if (!containerRef.current) return false;

    const currentScrollX = containerRef.current.scrollLeft;
    const currentScrollY = containerRef.current.scrollTop;

    const canScrollUp = currentScrollY > 0;
    const canScrollDown = currentScrollY < maxScrollY;
    const canScrollLeft = currentScrollX > 0;
    const canScrollRight = currentScrollX < maxScrollX;

    // Since we can potentially scroll in two directions at the same time,
    // let's keep track of the next scroll, starting with the current scroll.
    // Each of these values can then be adjusted independently in the logic
    // below.
    let nextScrollX = currentScrollX;
    let nextScrollY = currentScrollY;

    // As we examine the mouse position within the edge, we want to make the
    // incremental scroll changes more "intense" the closer that the user
    // gets the viewport edge. As such, we'll calculate the percentage that
    // the user has made it "through the edge" when calculating the delta.
    // Then, that use that percentage to back-off from the "max" step value.
    const maxStep = 50;

    // Should we scroll left?
    if (isInLeftEdge && canScrollLeft) {
      const intensity = (edgeLeft - viewportX) / edgeSize;
      nextScrollX = nextScrollX - maxStep * intensity;

      // Should we scroll right?
    } else if (isInRightEdge && canScrollRight) {
      const intensity = (viewportX - edgeRight) / edgeSize;
      nextScrollX = nextScrollX + maxStep * intensity;
    }
    // Should we scroll up?
    if (isInTopEdge && canScrollUp) {
      const intensity = (edgeTop - viewportY) / edgeSize;
      nextScrollY = nextScrollY - maxStep * intensity;

      // Should we scroll down?
    } else if (isInBottomEdge && canScrollDown) {
      const intensity = (viewportY - edgeBottom) / edgeSize;
      nextScrollY = nextScrollY + maxStep * intensity;
    }

    // Sanitize invalid maximums. An invalid scroll offset won't break the
    // subsequent .scrollTo() call; however, it will make it harder to
    // determine if the .scrollTo() method should have been called in the
    // first place.
    nextScrollX = Math.max(0, Math.min(maxScrollX, nextScrollX));
    nextScrollY = Math.max(0, Math.min(maxScrollY, nextScrollY));

    if (nextScrollX !== currentScrollX || nextScrollY !== currentScrollY) {
      containerRef.current.scrollTo(nextScrollX, nextScrollY);
      return true;
    } else return false;
  }

  (function checkForWindowScroll() {
    clearTimeout(timerRef.current);

    if (adjustWindowScroll()) {
      timerRef.current = setTimeout(checkForWindowScroll, 30);
    }
  })();
};
